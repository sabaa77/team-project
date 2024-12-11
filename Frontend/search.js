const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');
const searchResultsContainer = document.getElementById('search-results');

searchIcon.addEventListener('click', () => {
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block';
    } else {
        searchBar.style.display = 'none';
    }
});

searchBar.addEventListener('input', () => {
    const query = searchBar.value.trim();

    if (query.length > 2) {
        fetch(`/search?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(results => {
                searchResultsContainer.innerHTML = '';
                if (results.length > 0) {
                    results.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.textContent = `${product.name} - ${product.description}`;
                        searchResultsContainer.appendChild(productDiv);
                    });
                } else {
                    searchResultsContainer.textContent = 'No products found.';
                }
            })
            .catch(error => {
                searchResultsContainer.textContent = 'An error occurred.';
            });
    } else {
        searchResultsContainer.innerHTML = '';
    }
});
