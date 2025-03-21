document.addEventListener('DOMContentLoaded', () => {

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (isLoggedIn) {

        const contactDetails = document.getElementById('contactDetails');
        contactDetails.style.display = 'none';

        const nameField = document.getElementById('name');
        nameField.value = userName;
    }
});

  const basketItems = JSON.parse(localStorage.getItem('basket')) || [];
  const orderSummaryContainer = document.querySelector('.order-summary');

  orderSummaryContainer.innerHTML = '<h2>Order Summary</h2>';

  if (basketItems.length === 0) {
      orderSummaryContainer.innerHTML = '<p>Your basket is empty.</p>';
      return;
  }

  let totalPrice = 0;

  basketItems.forEach(item => {
      const summaryItem = document.createElement('div');
      summaryItem.className = 'summary-item';
      summaryItem.innerHTML = `
          <span>${item.name} (x${item.quantity})</span>
          <span>£${(item.price * item.quantity).toFixed(2)}</span>
      `;
      orderSummaryContainer.appendChild(summaryItem);
      totalPrice += item.price * item.quantity;
  });

  const totalElement = document.createElement('div');
  totalElement.className = 'summary-item total';
  totalElement.innerHTML = `
      <span>Total</span>
      <span>£${totalPrice.toFixed(2)}</span>
  `;
  orderSummaryContainer.appendChild(totalElement);

document.getElementById('checkoutButton').addEventListener('click', function () {
  const email = document.getElementById('email').value.trim();
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const country = document.getElementById('country').value.trim();
  const zip = document.getElementById('zip').value.trim();
  const cardNumber = document.getElementById('cardNumber').value.trim();
  const cardName = document.getElementById('cardName').value.trim();
  const expiryDate = document.getElementById('expiryDate').value.trim();
  const cvv = document.getElementById('cvv').value.trim();

  let errorMessages = [];

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
      errorMessages.push('Please enter a valid email address.');
  }

  if (name.length < 2) {
      errorMessages.push('Name must be at least 2 characters long.');
  }

  if (!email || !name || !address || !city || !country || !zip) {
      errorMessages.push('Please fill out all required fields.');
  }

  if (!cardNumber || cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      errorMessages.push('Please enter a valid 16-digit card number.');
  }

  if (!cardName) {
      errorMessages.push('Please enter the cardholder name.');
  }

  if (!expiryDate) {
      errorMessages.push('Please enter the expiry date.');
  }

  if (!cvv || cvv.length !== 3 || !/^\d+$/.test(cvv)) {
      errorMessages.push('Please enter a valid 3-digit CVV.');
  }

  if (errorMessages.length > 0) {
      alert('There were some errors:\n' + errorMessages.join('\n'));
      return;
  }

  window.location.href = 'payment.html';
});