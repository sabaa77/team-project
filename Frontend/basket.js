function getBasket() {
    const basket = localStorage.getItem('basket');
    return basket ? JSON.parse(basket) : [];
}

function saveBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
}

function renderBasket() {
    const basketItems = getBasket();
    const basketContainer = document.getElementById('basket-items');
    const totalPriceContainer = document.getElementById('total-price-container');

    basketContainer.innerHTML = '';

    if (basketItems.length === 0) {
        totalPriceContainer.innerText = 'Your basket is empty';
        return;
    }

    let totalPrice = 0;

    basketItems.forEach((item, index) => {
        const row = document.createElement('tr');

        const productCell = document.createElement('td');
        productCell.innerText = item.name;

        const priceCell = document.createElement('td');
        priceCell.innerText = `£${item.price}`;

        const quantityCell = document.createElement('td');
        quantityCell.innerText = item.quantity;

        const totalCell = document.createElement('td');
        const itemTotal = item.price * item.quantity;
        totalCell.innerText = `£${itemTotal}`;
        totalPrice += itemTotal;

        const removeCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => {
            basketItems.splice(index, 1);
            saveBasket(basketItems);
            renderBasket();
        });
        removeCell.appendChild(removeBtn);

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(removeCell);

        basketContainer.appendChild(row);
    });

    totalPriceContainer.innerText = `Total: £${totalPrice}`;
}

function addToBasket(productName, price) {
    const basketItems = getBasket();

    const existingItem = basketItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basketItems.push({ name: productName, price: price, quantity: 1 });
    }

    saveBasket(basketItems);
    renderBasket();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

document.addEventListener('DOMContentLoaded', renderBasket);
