const BASKET_KEY = "basket_items";

function getBasketItems() {
    const items = localStorage.getItem(BASKET_KEY);
    return items ? JSON.parse(items) : [];
}

function saveBasketItems(items) {
    localStorage.setItem(BASKET_KEY, JSON.stringify(items));
}

function addToBasket(product) {
    const basket = getBasketItems();
    basket.push(product);
    saveBasketItems(basket);
    alert(`${product.name} added to the basket!`);
}

function updateBasketUI() {
    const basket = getBasketItems();
    const basketItemsContainer = document.getElementById("basket-items");
    const totalPriceContainer = document.getElementById("total-price-container");

    if (basket.length === 0) {
        basketItemsContainer.innerHTML = "";
        totalPriceContainer.textContent = "Your basket is empty";
        return;
    }

    let totalPrice = 0;
    basketItemsContainer.innerHTML = basket
        .map(
            (item, index) => `
        <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.size}</td>
            <td>${item.price}</td>
            <td><button class="remove-btn" onclick="removeFromBasket(${index})">Remove</button></td>
        </tr>
    `
        )
        .join("");

    basket.forEach((item) => {
        totalPrice += parseFloat(item.price.replace("£", ""));
    });

    totalPriceContainer.textContent = `Total Price: £${totalPrice.toFixed(2)}`;
}

function removeFromBasket(index) {
    const basket = getBasketItems();
    basket.splice(index, 1);
    saveBasketItems(basket);
    updateBasketUI();
}

document.addEventListener("DOMContentLoaded", updateBasketUI);
