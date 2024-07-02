function getCartItems() {
    let cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function removeFromCart(itemName) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter((item) => item.name !== itemName);
    saveCartItems(cartItems);
    displayCartItems();
}

function displayCartItems() {
    let cartItems = getCartItems();
    let cartContainer = document.querySelector('.cart-items');
    let cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartContainer.innerHTML = '';

    cartItems.forEach((item) => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-price">Price: $${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                <div class="delivery-info">Get by Tomorrow</div>
            </div>
            <button class="remove-from-cart" data-name="${item.name}"><i class="ri-close-line"></i></button>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);

    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            removeFromCart(itemName);
        });
    });
}

document.addEventListener('DOMContentLoaded', displayCartItems);

document.querySelector('.checkout-btn').addEventListener('click', () => {
    let cartItems = getCartItems();
    if (cartItems.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        alert('Your cart is empty. Add items to the cart before proceeding to checkout.');
    }
});