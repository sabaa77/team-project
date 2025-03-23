document.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (isLoggedIn) {
        const contactDetails = document.getElementById('contactDetails');
        if (contactDetails) {
            contactDetails.style.display = 'none';
        }

        const nameField = document.getElementById('name');
        if (nameField) {
            nameField.value = userName || '';
        }

        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.value = userEmail || '';
        }

        const guestMessage = document.querySelector('#guestMessage');
        if (guestMessage) {
            guestMessage.style.display = 'none';
        }
    }

    const basketItems = isLoggedIn
        ? await fetchBasketFromBackend()
        : JSON.parse(localStorage.getItem('basket')) || [];

    const orderSummaryContainer = document.querySelector('.order-summary');
    orderSummaryContainer.innerHTML = '<h2>Order Summary</h2>';

    if (basketItems.length === 0) {
        orderSummaryContainer.innerHTML = '<p>Your basket is empty.</p>';
        return;
    }

    let totalPrice = 0;

    basketItems.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.product_name} (x${item.quantity})</span>
            <span>£${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderSummaryContainer.appendChild(summaryItem);
        totalPrice += item.price * item.quantity;
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'summary-item total';
    totalElement.innerHTML = `
        <span>Total</span>
        <span>£${totalPrice.toFixed(2)}</span>
    `;
    orderSummaryContainer.appendChild(totalElement);
});

async function fetchBasketFromBackend() {
    try {
        const response = await fetch('loadBasket.php');
        const result = await response.json();

        if (result.success) {
            return result.basket || [];
        } else {
            console.error('Error loading basket:', result.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching basket from backend:', error);
        return [];
    }
}