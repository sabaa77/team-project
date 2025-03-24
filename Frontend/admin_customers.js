document.addEventListener('DOMContentLoaded', function() {
    fetchCustomers();
});

function fetchCustomers() {
    fetch('get_customers.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#customers-table tbody');
            tbody.innerHTML = '';
            data.forEach(customer => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${customer.user_id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>
                        <button onclick="editCustomer(${customer.user_id})">Edit</button>
                        <button onclick="deleteCustomer(${customer.user_id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching customers:', error));
}

document.getElementById('add-customer-btn').addEventListener('click', function() {
    document.getElementById('customer-modal').style.display = 'block';
    document.getElementById('customer-form').reset();
    document.getElementById('customer-id').value = '';
});

document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('customer-modal').style.display = 'none';
});

document.getElementById('customer-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('user_id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { name, email };
    if (password) data.password = password;
    if (id) data.id = id;

    const url = id ? 'update_customer.php' : 'add_customer.php';
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            fetchCustomers();
            document.getElementById('customer-modal').style.display = 'none';
        } else {
            alert(result.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

function editCustomer(id) {
    fetch(`get_customer.php?id=${id}`)
        .then(response => response.json())
        .then(customer => {
            document.getElementById('user_id').value = customer.user_id;
            document.getElementById('name').value = customer.name;
            document.getElementById('email').value = customer.email;
            document.getElementById('password').value = '';
            document.getElementById('customer-modal').style.display = 'block';
        })
        .catch(error => console.error('Error fetching customer:', error));
}

function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        fetch('delete_customer.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                fetchCustomers();
            } else {
                alert(result.message);
            }
        })
        .catch(error => console.error('Error deleting customer:', error));
    }
}