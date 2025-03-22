function getBasket() {
    const basket = localStorage.getItem('basket');
    return basket ? JSON.parse(basket) : [];
}

function saveBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
}

async function fetchBasketFromBackend() {
    try {
        const response = await fetch('saveBasket.php');
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
        productCell.innerText = `${item.name} (Size: ${item.size})`;

        const priceCell = document.createElement('td');
        priceCell.innerText = `£${item.price}`;

        const quantityCell = document.createElement('td');
        quantityCell.innerText = item.quantity;

        const totalCell = document.createElement('td');
        const itemTotal = item.price * item.quantity;
        totalCell.innerText = `£${itemTotal}`;
        totalPrice += itemTotal;

        const removeCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', async () => {
            basketItems.splice(index, 1);
            saveBasket(basketItems);
            await updateBackendBasket(basketItems);
            renderBasket();
        });
        removeCell.appendChild(removeBtn);

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        row.appendChild(removeCell);

        basketContainer.appendChild(row);
    });

    totalPriceContainer.innerText = `Total: £${totalPrice}`;
}

async function updateBackendBasket(basket) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return;

    console.log('Sending basket to backend:', basket);

    try {
        const response = await fetch('saveBasket.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basket),
        });

        const result = await response.json();
        if (!result.success) {
            console.error('Error saving basket to backend:', result.message);
        }
    } catch (error) {
        console.error('Error updating backend basket:', error);
    }
}

function addToBasket(product) {
    const basketItems = getBasket();

    const existingItem = basketItems.find(
        item => item.product_id === product.product_id && item.size === product.size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basketItems.push({
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            size: product.size,
            quantity: 1,
        });
    }

    saveBasket(basketItems);
    updateBackendBasket(basketItems);
    renderBasket();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

document.addEventListener('DOMContentLoaded', renderBasket);