document.getElementById("home").addEventListener("click", function(){

    window.location.href="/public/home/home.html";
    
});

document.getElementById("cart").addEventListener("click", function(){

    window.location.href="/public/cart/cart.html";

});

document.getElementById("about").addEventListener("click", function(){

    window.location.href="/public/about/about.html";

});
    

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const testCard = event.target.closest('.test-card');
        const testName = testCard.querySelector('h3').innerText;

        // Get only the non-striked price (the first child of the .price element)
        const testPrice = testCard.querySelector('.price').innerText.split(' ')[0]; // Extract only the current price (₹)

        // Create a cart item object
        const cartItem = {
            name: testName,
            price: testPrice
        };

        // Get existing cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new item to the cart items array
        cartItems.push(cartItem);

        // Save the updated cart items back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        alert(`${testName} has been added to your cart.`);
    });
});