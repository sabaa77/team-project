let basketObject;
const localStorageBasket = localStorage.getItem('basket');
if (localStorageBasket) {
    basketObject = JSON.parse(localStorageBasket);
} else {
    basketObject = [];
}

function addToBasket(product) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

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
            } else {
                console.error('Error loading basket:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const basketItemsDiv = document.getElementById('basketItems');
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
    basket.splice(index, 1);
    renderBasket();
}

async function saveBasket() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        alert('You must be logged in to save your basket.');
        return;
    }

    try {
        const response = await fetch('saveBasket.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basketObject)
        });

        const result = await response.json();
        if (result.success) {
            alert('Basket saved successfully.');
        } else {
            alert('Failed to save basket: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the basket.');
    }
}