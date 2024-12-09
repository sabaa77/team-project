document.getElementById('checkoutButton').addEventListener('click', function() {
  // Validate the form fields
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  const zip = document.getElementById('zip').value;
  
  if (!email || !name || !address || !city || !country || !zip) {
    alert('Please fill out all required fields.');
    return;
  }

  // Simulate form submission
  alert('Order submitted successfully!\n\nThank you for your purchase, ' + name + '!');
});
