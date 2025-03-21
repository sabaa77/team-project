let basketObject;
const localStorageBasket = localStorage.getItem('basket');
if (localStorageBasket) {
    try {
        basketObject = JSON.parse(localStorageBasket);
    } catch (error) {
        basketObject = [];
    }
} else {
    basketObject = [];
}

function addToBasket(product) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!product.name || !product.price || !product.size) {
        alert('Failed to add product to basket. Please try again.');
        return;
    }

    const itemExists = basketObject.findIndex(
        (item) => item.name === product.name && item.size === product.size
    );

    if (itemExists !== -1) {
        basketObject[itemExists].quantity += 1;
    } else {
        product.quantity = 1;
        basketObject.push(product);
    }

    localStorage.setItem('basket', JSON.stringify(basketObject));

    if (isLoggedIn) {
        saveBasket();
    }

    renderBasket();
}

async function renderBasket() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        try {
            const response = await fetch('loadBasket.php');
            const result = await response.json();

            if (result.success) {
                basketObject = result.basket;
                localStorage.setItem('basket', JSON.stringify(basketObject));
            }
        } catch (error) {}
    }

    const basketItemsDiv = document.getElementById('basketItems');
    if (!basketItemsDiv) {
        return;
    }

    basketItemsDiv.innerHTML = '';

    if (basketObject.length === 0) {
        basketItemsDiv.innerHTML = '<p>Your basket is empty.</p>';
        return;
    }

    basketObject.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `${item.name} - £${item.price} (x${item.quantity}) <button onclick="removeFromBasket(${index})">Remove</button>`;
        basketItemsDiv.appendChild(div);
    });
}

function removeFromBasket(index) {
    if (index < 0 || index >= basketObject.length) {
        return;
    }

    basketObject.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basketObject));
    renderBasket();
}

async function saveBasket() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        return;
    }

    try {
        const response = await fetch('saveBasket.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basketObject)
        });

        const result = await response.json();
        if (!result.success) {}
    } catch (error) {}
}