document.getElementById('checkoutButton').addEventListener('click', function () {
  const form = document.getElementById('checkoutForm');
  if (form.checkValidity()) {
    alert('Payment processing is not configured. Fill this in with your payment gateway API.');
  } else {
    form.reportValidity();
  }
});
