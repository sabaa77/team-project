document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const product_name = addProductForm.querySelector('input[name="product_name"]').value;
            const product_description = addProductForm.querySelector('textarea[name="product_description"]').value;
            const price = parseFloat(addProductForm.querySelector('input[name="price"]').value);
            const stock_level = parseInt(addProductForm.querySelector('input[name="stock_level"]').value, 10);
            const image_url = addProductForm.querySelector('input[name="image_url"]').value;
            const product_page_url = addProductForm.querySelector('input[name="product_page_url"]').value;
            let category_id = addProductForm.querySelector('input[name="category_id"]') ? addProductForm.querySelector('input[name="category_id"]').value : '1';
            category_id = parseInt(category_id, 10);
            const payload = {
                action: 'add_product',
                product_name,
                product_description,
                price,
                stock_level,
                image_url,
                product_page_url,
                category_id
            };
            try {
                const response = await fetch('inventory.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await response.json();
                console.log('Add product response:', data);
                if (data.success) {
                    alert(data.message);
                    addProductForm.reset();
                } else {
                    alert(`Error adding product: ${data.message}`);
                }
            } catch (error) {
                console.error('Error adding product:', error);
                alert('Failed to add product.');
            }
        });
    }
    async function fetchInventory() {
        try {
            const response = await fetch('inventory.php');
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
    fetchInventory();
    fetchAlerts();
});
