document.getElementById("home").addEventListener("click", function(){

    window.location.href="/home/home.html";
    
});

document.getElementById("cart").addEventListener("click", function(){

    window.location.href="/cart/cart.html";

});

document.getElementById("about").addEventListener("click", function(){

    window.location.href="/about/about.html";

});

// Basic form validation
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate the form fields
    if (name === '' || email === '' || phone === '' || message === '') {
        alert("Please fill out all fields.");
        return;
    }

    // Simulate form submission
    alert(`Thank you, ${name}! Your message has been received.`);
    
    // Clear the form
    document.getElementById('contact-form').reset();
});

// Smooth scroll for buttons (optional if the buttons are linked to other sections)
document.getElementById('home').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('about').addEventListener('click', function() {
    // Simulating navigation to About Us
    alert("Navigate to About Us page.");
});

document.getElementById('cart').addEventListener('click', function() {
    // Simulating cart functionality
    alert("Navigate to Cart.");
});