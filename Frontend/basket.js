function initialiseBasket(){
    const basket = [];
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const prodElement = event.target.closest('.product');
            const prodID = productElement.dataset.id;
            const prodName = prodElement.dataset.name;
            const prodPrice = parseFloat(productElement.dataset.price);
    
            const existingProduct = basketProduct = basket.find(item => item.id === prodID);
            if (existingProduct){
                existingProduct.quantity += 1;
            } else {
                basket.push({ id:prodID, name:prodName, price: productPrice, quantity: 1});
            }
    
            updateBasketUI();
        });
    });
}

function updateBasketUI() {
    const basketItems = document.getElementById('basket-items');
    const totalPriceElement = document.getElementById('total-price');

    basketItems.innerHTML = '';

    let totalPrice = 0;
    basket.forEach(item => {
        const li = document.createElement('li');
        li.textContent = '${item.name} - $$(item.price) x ${item.quantity}';
        basketItems.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}