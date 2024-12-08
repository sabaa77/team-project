let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name && item.size === product.size);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateBasketUI();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateBasketUI() {
    const basketItemsContainer = document.getElementById('basket-items');
    const totalPriceContainer = document.getElementById('total-price-container');

    basketItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        totalPriceContainer.textContent = "Your basket is empty";
        return;
    }

    let totalPrice = 0;


    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        basketItemsContainer.innerHTML += `
            <tr>
                <td>${item.name} (Size: ${item.size})</td>
                <td>£${item.price}</td>
                <td>${item.quantity}</td>
                <td>£${itemTotal.toFixed(2)}</td>
                <td><button onclick="removeFromCart('${item.name}', '${item.size}')">Remove</button></td>
            </tr>
        `;
    });

    totalPriceContainer.textContent = `Total: £${totalPrice.toFixed(2)}`;
}

function removeFromCart(productName, productSize) {
    cart = cart.filter(item => !(item.name === productName && item.size === productSize));
    updateBasketUI();
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
    updateBasketUI();
});
