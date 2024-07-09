
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

document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('search-icon');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const productSection = document.querySelector('.n-product');
    const productCards = document.querySelectorAll('.product-card');
  
    // Toggle search form visibility
    searchIcon.addEventListener('click', function(event) {
      event.preventDefault();
      if (searchForm.style.display === 'block') {
        searchForm.style.display = 'none';
        searchResults.style.display = 'none';
        searchInput.value = '';
        productCards.forEach(card => card.classList.remove('highlight'));
      } else {
        searchForm.style.display = 'block';
      }
    });
  
    // Handle search functionality
    searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();
      searchResults.innerHTML = '';
  
      if (query.trim() === '') {
        searchResults.style.display = 'none';
        productCards.forEach(card => card.classList.remove('highlight'));
        return;
      }
  
      let results = [];
      productCards.forEach(card => {
        const productName = card.querySelector('h3').innerText.toLowerCase();
        if (productName.includes(query)) {
          card.classList.add('highlight');
          results.push(card.outerHTML);
        } else {
          card.classList.remove('highlight');
        }
      });
  
      if (results.length > 0) {
        searchResults.style.display = 'block';
        searchResults.innerHTML = results.join('');
        productSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the product section
      } else {
        searchResults.style.display = 'block';
        searchResults.innerHTML = '<p>No products found.</p>';
      }
    });
  });
  