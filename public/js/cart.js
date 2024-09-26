
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');

    // Function to update the cart display
    const updateCartDisplay = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let totalPrice = 0;

        // Clear current items
        cartItemsContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartItems.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <button class="remove-button">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                // Calculate total price
                totalPrice += parseInt(item.price.replace('₹', '').replace(',', '')); // Remove ₹ and convert to number
            });
        }

        // Update total items and total price
        totalItemsElement.textContent = `Total Items: ${cartItems.length}`;
        totalPriceElement.textContent = `Total Price: ₹${totalPrice}`;
    };

    // Initial display update
    updateCartDisplay();

    // Add functionality to remove items from cart
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            const itemName = event.target.previousElementSibling.previousElementSibling.innerText;

            // Get current cart items
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Filter out the removed item
            const updatedCartItems = cartItems.filter(item => item.name !== itemName);

            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

            // Refresh the cart display
            updateCartDisplay();
        }
    });

    // Example: Function to add items to the cart
    // Call this function wherever you handle adding items to the cart (like in test.js)
    const addToCart = (item) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartDisplay(); // Update the display after adding
    };

    // Expose the addToCart function for use in other scripts
    window.addToCart = addToCart;
});

document.getElementById("lab-test").addEventListener("click", function(){

    window.location.href="/test/test.html";

});

document.getElementById("home").addEventListener("click", function(){

    window.location.href="/home/home.html";

});

document.getElementById("about").addEventListener("click", function(){

    window.location.href="/about/about.html";

});