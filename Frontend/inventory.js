document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const action = e.submitter.value;
            const product_name = addProductForm.querySelector('input[name="product_name"]').value;
            const product_description = addProductForm.querySelector('textarea[name="product_description"]').value;
            const price = parseFloat(addProductForm.querySelector('input[name="price"]').value);
            const stock_level = parseInt(addProductForm.querySelector('input[name="stock_level"]').value, 10);
            const image_url = addProductForm.querySelector('input[name="image_url"]').value;
            const product_page_url = addProductForm.querySelector('input[name="product_page_url"]').value;
            let category_id = addProductForm.querySelector('input[name="category_id"]').value || '1';
            category_id = parseInt(category_id, 10);
            const payload = {
                action: action,
                product_name,
                product_description,
                price,
                stock_level,
                image_url,
                product_page_url,
                category_id
            };
            const productIdElement = addProductForm.querySelector('input[name="product_id"]');
            if (productIdElement && productIdElement.value) {
                payload.product_id = productIdElement.value;
            } else if (action === 'update_product' || action === 'delete_product') {
                alert('Product ID is required for this action.');
                return;
            }
            try {
                const response = await fetch('inventory.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await response.json();
                console.log('Product response:', data);
                if (data.success) {
                    alert(data.message);
                    addProductForm.reset();
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to submit form.');
            }
        });
    }
    async function fetchInventory() {
        try {
            const response = await fetch('inventory.php');
            const data = await response.json();
            console.log('Inventory data:', data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
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
