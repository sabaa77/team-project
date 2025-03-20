document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#search-bar input");
    const searchButton = document.querySelector("#search-bar button");

    if (!searchInput || !searchButton) {
        console.error("Search input or button not found in the DOM.");
        return;
    }

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `searchresults.html?query=${encodeURIComponent(query)}`;
        } else {
            alert("Please enter a search term.");
        }
    });

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `searchresults.html?query=${encodeURIComponent(query)}`;
            } else {
                alert("Please enter a search term.");
            }
        }
    });
});