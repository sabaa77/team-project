let basketObject;
const localSotrageBasket = localStorage.getItem('basket');
if (localSotrageBasket) {
    basketObject = JSON.parse(localSotrageBasket);
}else{
    basketObject = []
}

function addToBasket(product) {
    var itemExists = basketObject.findIndex((item)=> item.name === product.name && item.size === product.size);
    if (itemExists!=-1){
        basketObject[itemExists]["quantity"]+= 1;
    }else{
        product.quantity = 1;
        basketObject.push(product);
    }
    localStorage.setItem('basket',JSON.stringify(basketObject));
    renderBasket();
}

function renderBasket() {
    const basketItemsDiv = document.getElementById('basketItems');
    basketItemsDiv.innerHTML = '';
    
    basket.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `${item.product} - $${item.price} <button onclick="removeFromBasket(${index})">Remove</button>`;
        basketItemsDiv.appendChild(div);
    });
}

function removeFromBasket(index) {
    basket.splice(index, 1);
    renderBasket();
}

async function saveBasket() {
    const email = prompt('Enter your email to save your basket');

    if (!email) {
        alert('Email is required to save the basket.');
        return;
    }

    const response = await fetch('/saveBasket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, basket })
    });

    const result = await response.text();
    if (response.ok) {
        alert(result);
    } else {
        alert('Failed to save basket: ' + result);
    }
}
