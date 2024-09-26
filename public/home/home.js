// Typing Feature
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

// Start the typing effect when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    headingElement.innerHTML = ""; // Clear the heading initially
    typeWriter(); // Call the typing function
});
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("more-info").addEventListener("click", function() {
      window.location.href = "/public/about/about.html";
  });
});

// // Add event listener for the "more-info" button
// document.getElementById("more-info").addEventListener("click", function() {
//   window.location.href = "/public/about"; // Redirect to the about page
// });

document.getElementById("more-labtest").addEventListener("click", function(){
  window.location.href = "/public/test/test.html";
});