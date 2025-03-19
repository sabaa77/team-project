document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector("#search-cotainer button");

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
        }
    });

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `searchResults.html?query=${encodeURIComponent(query)}`;
            }
        }
    });
});