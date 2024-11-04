// Typing Feature for the heading text
const headingText = "Welcome To RedCell Laboratories";
const typingSpeed = 100; 
const headingElement = document.querySelector("header h1"); 

let i = 0;

function typeWriter() {
    if (i < headingText.length) {
        headingElement.innerHTML += headingText.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    headingElement.innerHTML = ""; // Clear the heading initially
    typeWriter(); // Start typing effect

    // Redirect buttons in cards
    document.getElementById("more-info").addEventListener("click", function() {
        window.location.href = "/about/about.html";
    });

    document.getElementById("more-labtest").addEventListener("click", function() {
        window.location.href = "/test/test.html";
    });

    document.getElementById("more-booktest").addEventListener("click", function() {
        window.location.href = "/booking/booking.html";
    });

    // Smooth scroll to the "Contact Us" section (if implemented)
    const contactLink = document.querySelector('a[href="#contact"]');
    const contactSection = document.getElementById("contact-us");

    if (contactLink && contactSection) {
        contactLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default link behavior
            contactSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to Contact section
        });
    }
});

document.getElementById("more-contact").addEventListener("click", function(){
    window.location.href = "/contact/contact.html";
})

