function addProductToBasket() {
    
    const productContainer = document.querySelector(".product-container");

    const productName = productContainer.getAttribute("data-name");
    const productPrice = productContainer.getAttribute("data-price");
    const size = document.getElementById("size").value;

    if (!size) {
        alert("Please select a size.");
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        size: size,
    };

    addToBasket(product);
}
