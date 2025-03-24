document.addEventListener('DOMContentLoaded', async () => {
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        const handleCheckout = async () => {
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const country = document.getElementById('country').value;
            const postal_code = document.getElementById('postal_code').value;
            const cardNumber = document.getElementById('cardNumber').value;
            const cardName = document.getElementById('cardName').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;

            const basketItems = JSON.parse(localStorage.getItem('basket')) || [];

            if (basketItems.length === 0) {
                alert('Your basket is empty. Please add items to your basket before proceeding.');
                checkoutButton.disabled = false;
                return;
            }

            if (!email || !name || !address || !city || !country || !postal_code || !cardNumber || !cardName || !expiryDate || !cvv) {
                alert('Please fill out all required fields.');
                return;
            }

            const orderDetails = {
                email,
                name,
                address,
                city,
                country,
                postal_code,
                cardNumber,
                cardName,
                expiryDate,
                cvv,
                basket: basketItems,
            };

            console.log('Order details being sent:', orderDetails);

            try {
                const response = await fetch('processOrder.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderDetails),
                });

                const result = await response.json();
                console.log('Order response:', result);

                if (result.success) {
                    localStorage.removeItem('basket');

                    try {
                        const clearResponse = await fetch('saveBasket.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ clearBasket: true }),
                        });

                        const clearResult = await clearResponse.json();
                        console.log('Backend basket clear response:', clearResult);

                        if (!clearResult.success) {
                            console.error('Failed to clear basket in backend:', clearResult.message);
                        }
                    } catch (clearError) {
                        console.error('Error clearing basket in backend:', clearError);
                    }
                    console.log('Redirecting to payment page with order_id:', result.order_id);
                    window.location.href = `payment.html?order_id=${result.order_id}`;
                } else {
                    alert(`Failed to place order: ${result.message}`);
                }
            } catch (error) {
                console.error('Error processing order:', error);
                alert('An error occurred while processing your order. Please try again.');
            }
        };
        
        checkoutButton.addEventListener('click', handleCheckout);
    }

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
            <span>${item.product_name} (Size: ${item.size}) x${item.quantity}</span>
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