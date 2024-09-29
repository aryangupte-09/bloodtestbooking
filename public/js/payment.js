document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the total amount from localStorage and display it in the amount field
    const totalPrice = localStorage.getItem('totalPrice');
    
    if (totalPrice) {
        document.getElementById('amount').value = totalPrice;
    }

    handlePaymentMethodChange(); // Call this function to handle initial payment method display
});

// Handle changes in the payment method selection
function handlePaymentMethodChange() {
    const paymentMethod = document.getElementById('payment-method').value;
    const cardPaymentFields = document.getElementById('card-payment-fields');
    const upiPaymentFields = document.getElementById('upi-payment-fields');
    
    // Show/Hide relevant fields based on the selected payment method
    if (paymentMethod === 'card') {
        cardPaymentFields.style.display = 'block';
        upiPaymentFields.style.display = 'none';
    } else if (paymentMethod === 'upi') {
        cardPaymentFields.style.display = 'none';
        upiPaymentFields.style.display = 'block';
        generateQRCode(); // Generate a random QR code when UPI is selected
    } else {
        cardPaymentFields.style.display = 'none';
        upiPaymentFields.style.display = 'none';
    }
}


// Generate a random QR code for UPI payment
function generateQRCode() {
    const qrCode = document.getElementById('upi-qr-code');
    const amount = document.getElementById('amount').value;
    // For demonstration purposes, we will use a random number to simulate a QR code
    const upiPaymentUri = `upi://pay?pa=demo@upi&pn=Demo&am=${amount}&cu=INR`;
    const randomQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiPaymentUri)}`;
    qrCode.src = randomQRCode;
}

// Payment form validation and processing
function processPayment() {
    const paymentMethod = document.getElementById('payment-method').value;
    const amount = document.getElementById('amount').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none'; // Hide error messages initially

    if (paymentMethod === 'card') {
        const cardholderName = document.getElementById('cardholder-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        // Validate card payment fields
        if (!validateCardNumber(cardNumber)) {
            errorMessage.innerHTML = "Invalid card number.";
            errorMessage.style.display = "block";
            return false;
        }

        if (!validateExpiryDate(expiryDate)) {
            errorMessage.innerHTML = "Invalid expiry date.";
            errorMessage.style.display = "block";
            return false;
        }

        if (cvv.length !== 3 || isNaN(cvv)) {
            errorMessage.innerHTML = "Invalid CVV.";
            errorMessage.style.display = "block";
            return false;
        }
        const userEmail = getUserEmail(); // Retrieve the user's email address
        const userName = getUserName(); // Retrieve the user's name

    // If all validations pass, process the payment and send a request to the server to send the confirmation email
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/sendConfirmationEmail', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ email: userEmail, name: userName }));
        

    }

    if (amount <= 0) {
        errorMessage.innerHTML = "Amount must be greater than zero.";
        errorMessage.style.display = "block";
        return false;
    }

    // If all validations pass, process the payment
    alert(`Payment of ₹${amount} through ${paymentMethod} was successful!`);
    return true;
}

// Validate card number (simple check)
function validateCardNumber(cardNumber) {
    const regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return regex.test(cardNumber);
}

// Validate expiry date (MM/YY format)
function validateExpiryDate(expiryDate) {
    const regex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    return regex.test(expiryDate);
}

