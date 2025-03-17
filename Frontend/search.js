function searchProducts() {
    let query = document.getElementById("searchInput").value;

    fetch(`search.php?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            let resultsDiv = document.getElementById("searchResults");
            resultsDiv.innerHTML = "";
            
            if (data.length === 0) {
                resultsDiv.innerHTML = "<p>No products found</p>";
                return;
            }

            data.forEach(product => {
                resultsDiv.innerHTML += `
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Price: $${product.price}</p>
                        <img src="${product.image_url}" width="100">
                    </div>
                    <hr>
                `;
            });
        });
}
