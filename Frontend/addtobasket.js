let basketObject = [];
const localStorageBasket = localStorage.getItem('basket');
if (localStorageBasket) {
    try {
        basketObject = JSON.parse(localStorageBasket);
    } catch (error) {
        basketObject = [];
    }
}

function addToBasket(product) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!product.product_name || !product.price || !product.size || !product.product_id) {
        alert('Failed to add product to basket. Please try again.');
        return;
    }

    const itemExists = basketObject.findIndex(
        (item) => item.product_id === product.product_id && item.size === product.size
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

    displaySuccessMessage(`${product.product_name} (Size: ${product.size}) has been added to your basket.`);
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
        div.innerHTML = `
            ${item.name} - £${item.price} (x${item.quantity}) 
            <button onclick="removeFromBasket(${index})">Remove</button>
        `;
        basketItemsDiv.appendChild(div);
    });
}

function removeFromBasket(index) {
    if (index < 0 || index >= basketObject.length) {
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
            alert('Failed to sync basket with the server. Please try again.');
        }
    } catch (error) {
        alert('An error occurred while syncing your basket. Please try again.');
    }
}

function displaySuccessMessage(message) {
    let messageContainer = document.getElementById('success-message');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'success-message';
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '10px';
        messageContainer.style.right = '10px';
        messageContainer.style.backgroundColor = '#4CAF50';
        messageContainer.style.color = 'white';
        messageContainer.style.padding = '10px 20px';
        messageContainer.style.borderRadius = '5px';
        messageContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        messageContainer.style.zIndex = '1000';
        document.body.appendChild(messageContainer);
    }

    messageContainer.innerText = message;

    setTimeout(() => {
        messageContainer.remove();
    }, 3000);
}