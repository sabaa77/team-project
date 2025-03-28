let basketObject = [];
const localStorageBasket = localStorage.getItem('basket');
if (localStorageBasket) {
    try {
        basketObject = JSON.parse(localStorageBasket);
    } catch (error) {
        console.error('Error parsing basket data:', error);
        basketObject = [];
    }
}

function addToBasket(product) {
    if (!product.product_name || !product.price || !product.product_id || !product.size) {
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
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
        } catch (error) {
            console.error('Error fetching basket from backend:', error);
        }
    }
    const basketItemsDiv = document.getElementById('basket-items');
    if (!basketItemsDiv) return;
    basketItemsDiv.innerHTML = '';
    if (basketObject.length === 0) {
        basketItemsDiv.innerHTML = '<tr><td colspan="6">Your basket is empty.</td></tr>';
        return;
    }
    basketObject.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product_name}</td>
            <td>£${item.price}</td>
            <td>${item.size}</td>
            <td>
                <button onclick="updateQuantity(${index}, 'decrease')">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 'increase')">+</button>
            </td>
            <td>£${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromBasket(${index})">Remove</button></td>
        `;
        basketItemsDiv.appendChild(row);
    });
    let totalPrice = basketObject.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPriceContainer = document.getElementById('total-price-container');
    totalPriceContainer.innerText = `Total: £${totalPrice}`;
}

function updateQuantity(index, action) {
    if (index < 0 || index >= basketObject.length) return;
    if (action === 'increase') {
        basketObject[index].quantity += 1;
    } else if (action === 'decrease') {
        basketObject[index].quantity = Math.max(1, basketObject[index].quantity - 1);
    }
    localStorage.setItem('basket', JSON.stringify(basketObject));
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        saveBasket();
    }
    renderBasket();
}

function removeFromBasket(index) {
    if (index < 0 || index >= basketObject.length) return;
    basketObject.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basketObject));
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        saveBasket();
    }
    renderBasket();
}

async function saveBasket() {
    console.log('saveBasket() triggered');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        console.log('User not logged in, skipping server sync.');
        return;
    }
    try {
        console.log('Sending basket to backend:', JSON.stringify(basketObject));
        const response = await fetch('saveBasket.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(basketObject)
        });
        const result = await response.json();
        console.log('Response:', result);
        if (!result.success) {
            console.error('Failed to save basket:', result.message);
            alert('Failed to sync basket with the server. Please try again.');
        }
    } catch (error) {
        console.error('Error updating backend basket:', error);
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

document.addEventListener('DOMContentLoaded', () => {
    renderBasket();
});
