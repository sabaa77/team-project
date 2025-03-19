document.addEventListener("DOMContentLoaded", () => {
    const searchResultsDiv = document.getElementById("searchResults");
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("query");

    if (!query) {
        searchResultsDiv.innerHTML = "<p>No search query provided.</p>";
        return;
    }

    fetch(`search.php?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                searchResultsDiv.innerHTML = "<p>No products found for your search.</p>";
                return;
            }

            data.forEach(product => {
                const productHTML = `
                    <div class="product">
                        <a href="productDetails.html?id=${product.id}">
                            <img src="${product.image_url}" alt="${product.name}">
                        </a>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Price: £${product.price}</p>
                    </div>
                `;
                searchResultsDiv.innerHTML += productHTML;
            });
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
            searchResultsDiv.innerHTML = "<p>Error loading search results. Please try again later.</p>";
        });
});