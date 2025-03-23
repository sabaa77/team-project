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
        sizeCell.innerText = item.size

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
            renderBasket();
            await updateBackendBasket(basketItems);
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

async function updateBackendBasket(basket) {
    console.log('updateBackendBasket() triggered');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        console.log('User not logged in, skipping backend sync');
        return;
    }

    try {
        console.log('Sending basket to backend:', JSON.stringify(basket));
        const response = await fetch('saveBasket.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basket),
        });

        const result = await response.json();
        console.log('Backend response:', result);

        if (!result.success) {
            console.error('Failed to sync basket:', result.message);
            alert('Failed to sync basket with the server. Please try again.');
        }
    } catch (error) {
        console.error('Error syncing backend basket:', error);
        alert('An error occurred while syncing your basket. Please try again.');
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
            product_name: product.product_name,
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