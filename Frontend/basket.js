// Array to store cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add an item to the cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name && item.size === product.size);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if item exists
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new product to cart
    }

    updateBasketUI();
    localStorage.setItem('cart', JSON.stringify(cart)); // Persist cart in localStorage
}

// Function to update the basket UI
function updateBasketUI() {
    const basketItemsContainer = document.getElementById('basket-items');
    const totalPriceContainer = document.getElementById('total-price-container');

    // Clear existing UI
    basketItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        totalPriceContainer.textContent = "Your basket is empty";
        return;
    }

    let totalPrice = 0;

    // Populate basket UI
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

// Function to remove an item from the cart
function removeFromCart(productName, productSize) {
    cart = cart.filter(item => !(item.name === productName && item.size === productSize));
    updateBasketUI();
    localStorage.setItem('cart', JSON.stringify(cart)); // Update storage
}

// Initialize the basket UI on page load
document.addEventListener('DOMContentLoaded', () => {
    updateBasketUI();
});
