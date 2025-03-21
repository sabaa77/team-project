let basketObject = [];
const localStorageBasket = localStorage.getItem('basket');
if (localStorageBasket) {
    try {
        basketObject = JSON.parse(localStorageBasket);
    } catch (error) {
        console.error('Error parsing basket from localStorage:', error);
        basketObject = [];
    }
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
            } else {
                console.error('Error loading basket:', result.message);
            }
        } catch (error) {
            console.error('Error fetching basket from backend:', error);
        }
    }

    const basketItemsDiv = document.getElementById('basketItems');
    if (!basketItemsDiv) {
        console.error('Basket items container not found in the DOM.');
        return;
    }

    basketItemsDiv.innerHTML = '';

    if (basketObject.length === 0) {
        basketItemsDiv.innerHTML = '<p>Your basket is empty.</p>';
        return;
    }

    basketObject.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            ${item.name} - £${item.price} (x${item.quantity}) 
            <button onclick="removeFromBasket(${index})">Remove</button>
        `;
        basketItemsDiv.appendChild(div);
    });
}

function removeFromBasket(index) {
    if (index < 0 || index >= basketObject.length) {
        console.error('Invalid index for removing item from basket:', index);
        return;
    }

    basketObject.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basketObject));

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        saveBasket();
    }

    renderBasket();
}

async function saveBasket() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        console.warn('User is not logged in. Basket will not be saved to the backend.');
        return;
    }

    try {
        const response = await fetch('saveBasket.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basketObject),
        });

        const result = await response.json();
        if (!result.success) {
            console.error('Failed to save basket to backend:', result.message);
            alert('Failed to sync basket with the server. Please try again.');
        }
    } catch (error) {
        console.error('Error saving basket to backend:', error);
        alert('An error occurred while syncing your basket. Please try again.');
    }
}