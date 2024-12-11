document.getElementById('checkoutButton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const zip = document.getElementById('zip').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

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

    if (!cardNumber || cardNumber.length !== 16) {
      errorMessages.push('Please enter a valid 16-digit card number.');
    }

  
    if (!cardName) {
      errorMessages.push('Please enter the cardholder name.');
    }

   
    if (!expiryDate) {
      errorMessages.push('Please enter the expiry date.');
    }


    if (!cvv || cvv.length !== 3) {
      errorMessages.push('Please enter a valid 3-digit CVV.');
    }

    
    if (errorMessages.length > 0) {
      alert('There were some errors:\n' + errorMessages.join('\n'));
      return;
    }

    
    alert('Order submitted successfully!\n\nThank you for your purchase, ' + name + '!');
  });

