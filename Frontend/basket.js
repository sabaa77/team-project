let basket = JSON.parse(localStorage.getItem('basket')) || [];

function updateBasketUI() {
    const basketItems = document.getElementById('basket-items');
    basketItems.innerHTML = '';

    if (basket.length === 0) {
        document.getElementById('total-price-container').innerText = "Your basket is empty";
        return;
    }

    let totalPrice = 0;

    basket.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td>£${product.price}</td>
            <td>${product.quantity}</td>
            <td>£${product.price * product.quantity}</td>
            <td><button class="remove-btn" onclick="removeFromBasket(${index})">Remove</button></td>
        `;

        basketItems.appendChild(row);

        totalPrice += product.price * product.quantity;
    });

    document.getElementById('total-price-container').innerText = `Total: £${totalPrice}`;
}

function removeFromBasket(index) {
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    updateBasketUI();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceed to checkout functionality coming soon.');
});

updateBasketUI();
