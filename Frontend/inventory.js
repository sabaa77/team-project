async function fetchInventory() {
    const response = await fetch('inventory.php');
    try {
        const data = await response.json();
        console.log('Inventory data:', data);
    } catch (error) {
        console.error('Error parsing inventory data:', error);
    }
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
        product_name: 'New Product',
        product_description: 'Description here',
        price: 100,
        stock_level: 10,
        image_url: 'image.jpg',
        product_page_url: 'product.html',
        category_id: 1
    };

    try {
        const response = await fetch('inventory.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'add_product', ...product })
        });

        const data = await response.json();
        console.log('Add product response:', data);

        if (data.success) {
            alert(data.message);
        } else {
            alert(`Error adding product: ${data.message}`);
        }
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchInventory();
    fetchAlerts();
});
