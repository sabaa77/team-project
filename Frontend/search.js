    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    
    searchIcon.addEventListener('click', () => {
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block';
    } else {
        searchBar.style.display = 'none';
    }
        
    });
    poop