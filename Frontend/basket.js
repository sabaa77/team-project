function getBasket() {
    const basket = localStorage.getItem('basket');
    return basket ? JSON.parse(basket) : [];
}

function saveBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
}

async function fetchBasketFromBackend() {
    try {
        const response = await fetch('loadBasket.php');
        const result = await response.json();
        if (result.success) {
            return result.basket || [];
        } else {
            console.error('Error loading basket from backend:', result.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching basket from backend:', error);
        return [];
    }
}

async function syncBasket() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const backendBasket = await fetchBasketFromBackend();
        saveBasket(backendBasket);
    }
}

async function renderBasket() {
    await syncBasket();

    const basketItems = getBasket();
    const basketContainer = document.getElementById('basket-items');
    const totalPriceContainer = document.getElementById('total-price-container');

    basketContainer.innerHTML = '';

    if (basketItems.length === 0) {
        totalPriceContainer.innerText = 'Your basket is empty';
        return;
    }

    let totalPrice = 0;

    basketItems.forEach((item, index) => {
        const row = document.createElement('tr');

        const productCell = document.createElement('td');
        productCell.innerText = `${item.product_name}`;

        const priceCell = document.createElement('td');
        priceCell.innerText = `£${item.price}`;

        const sizeCell = document.createElement('td');
        sizeCell.innerText = item.size;

        const quantityCell = document.createElement('td');

        const decreaseBtn = document.createElement('button');
        decreaseBtn.innerText = '-';
        decreaseBtn.onclick = () => updateQuantity(index, 'decrease');

        const quantitySpan = document.createElement('span');
        quantitySpan.innerText = item.quantity;

        const increaseBtn = document.createElement('button');
        increaseBtn.innerText = '+';
        increaseBtn.onclick = () => updateQuantity(index, 'increase');

        quantityCell.appendChild(decreaseBtn);
        quantityCell.appendChild(quantitySpan);
        quantityCell.appendChild(increaseBtn);

        const totalCell = document.createElement('td');
        const itemTotal = item.price * item.quantity;
        totalCell.innerText = `£${itemTotal}`;
        totalPrice += itemTotal;

        const removeCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', async () => {
            const currentBasket = getBasket();
            const updatedBasket = currentBasket.filter((_, i) => i !== index);
            saveBasket(updatedBasket);
            await updateBackendBasket(updatedBasket);
            renderBasket();
        });
        removeCell.appendChild(removeBtn);

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(sizeCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        row.appendChild(removeCell);

        basketContainer.appendChild(row);
    });

    totalPriceContainer.innerText = `Total: £${totalPrice}`;
}

function updateQuantity(index, action) {
    const basket = getBasket();

    if (index < 0 || index >= basket.length) return;

    if (action === 'increase') {
        basket[index].quantity += 1;
    } else if (action === 'decrease') {
        basket[index].quantity = Math.max(1, basket[index].quantity - 1);
    }

    saveBasket(basket);
    updateBackendBasket(basket);
    renderBasket();
}

async function updateBackendBasket(basket) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        return;
    }

    try {
        const response = await fetch('saveBasket.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basket),
        });

        const result = await response.json();

        if (!result.success) {
            console.error('Failed to sync basket:', result.message);
            alert('Failed to sync basket with the server. Please try again.');
        }
    } catch (error) {
        console.error('Error syncing backend basket:', error);
        alert('An error occurred while syncing your basket. Please try again.');
    }
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

document.addEventListener('DOMContentLoaded', renderBasket);