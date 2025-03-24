document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();

    async function fetchOrders() {
        try {
            const response = await fetch('orders.php');
            const data = await response.json();

            if (data.success) {
                displayOrders(data.orders);
            } else {
                console.error('Failed to load orders:', data.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    function displayOrders(orders) {
        const container = document.getElementById('orders-container');
        container.innerHTML = '';

        if (orders.length === 0) {
            container.innerHTML = '<p>No orders found.</p>';
            return;
        }

        orders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('order');

            orderDiv.innerHTML = `
                <h3>Order #${order.order_id} - ${order.status}</h3>
                <p><strong>Name:</strong> ${order.name}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Address:</strong> ${order.address}, ${order.city}, ${order.country}, ${order.postal_code}</p>
                <p><strong>Date:</strong> ${order.order_date}</p>

                <h4>Items:</h4>
                <ul>
                    ${order.items.map(item => `
                        <li>${item.product_name} (Size: ${item.size}) - ${item.quantity} x $${item.price}</li>
                    `).join('')}
                </ul>

                <label for="status-${order.order_id}">Change Status:</label>
                <select id="status-${order.order_id}" class="status-select" data-order-id="${order.order_id}">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
                <button class="btn btn-update" onclick="updateOrder(${order.order_id})">Update</button>
            `;

            container.appendChild(orderDiv);
        });
    }

    window.updateOrder = async function (orderId) {
        const selectElement = document.getElementById(`status-${orderId}`);
        const newStatus = selectElement.value;

        try {
            const response = await fetch('orders.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order_id: orderId, status: newStatus })
            });

            const data = await response.json();
            if (data.success) {
                alert(data.message);
                fetchOrders();
            } else {
                alert('Failed to update order: ' + data.message);
            }
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update order.');
        }
    };
});
