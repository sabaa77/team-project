async function fetchInventory() {
    const response = await fetch('inventory.php');
    const data = await response.json();
    console.log(data);
}

async function fetchAlerts() {
    try {
        const response = await fetch('alerts.php');
        const data = await response.json();

        const alertsContainer = document.getElementById('alerts-container');
        alertsContainer.innerHTML = '';

        if (data.success && data.alerts.length > 0) {
            data.alerts.forEach(alert => {
                const alertDiv = document.createElement('div');
                alertDiv.classList.add('alert');
                alertDiv.textContent = `${alert.alert_message} (Stock: ${alert.stock_balance})`;
                alertsContainer.appendChild(alertDiv);
            });
        } else {
            alertsContainer.innerHTML = '<p>No low stock alerts.</p>';
        }
    } catch (error) {
        console.error('Error fetching alerts:', error);
        const alertsContainer = document.getElementById('alerts-container');
        alertsContainer.innerHTML = '<p>Failed to load alerts.</p>';
    }
}

async function addProduct() {
    const product = {
        name: 'New Product',
        description: 'Description here',
        price: 100,
        stock_level: 10,
        sizes: ['S', 'M', 'L'],
        image_url: 'image.jpg',
        product_page_url: 'product.html'
    };

    const response = await fetch('inventory.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_product', ...product })
    });

    const data = await response.json();
    console.log(data);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchInventory();
    fetchAlerts();
});