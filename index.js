
let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".headerlist");
menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};
window.onscroll = () => {
  menu.classList.remove("bx-x");
  navlist.classList.remove("open");
};
function getCartItems() {
    let cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function addToCart(item) {
    let cartItems = getCartItems();
    let existingItem = cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        item.quantity = 1;
        cartItems.push(item);
    }

    saveCartItems(cartItems);
    alert(`${item.name} added to cart`);
}

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image'); // Get image URL from button data

            const item = { name, price, image }; // Include image in item object
            addToCart(item);
        });
    });
});