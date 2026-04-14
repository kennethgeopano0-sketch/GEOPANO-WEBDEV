const products = [
  {
    name: "Midnight Truffle",
    price: 600,
    img: "midnightcake.jpg"
  },
  {
    name: "Velvet Strawberry",
    price: 550,
    img: "strwcake.jpg"
  },
  {
    name: "Golden Honey",
    price: 570,
    img: "honeycake.jpg"
  },
   {
    name: "Mango torte",
    price: 650,
    img: "mangocake.jpg"
  },
  {
    name: "Hazelnut Bliss",
    price: 400,
    img: "hazelnutcake.jpg"
  },
  {
    name: "Tiramisu",
    price: 440,
    img: "tiramisucake.jpg"
  },
  
];


// ===== CART STORAGE =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== LOAD PRODUCTS INTO CONTAINER =====
function loadProducts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  let html = '';
  products.forEach((p, i) => {
    html += `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₱${p.price}</p>
        <button onclick="addToCart(${i})">Add</button>
      </div>
    `;
  });
  container.innerHTML = html;
}

// ===== ADD TO CART =====
function addToCart(i) {
  const product = products[i];
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  alert(`${product.name} added to cart`);
}

// ===== REMOVE FROM CART =====
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

// ===== CHANGE QUANTITY =====
function changeQty(name, delta) {
  const item = cart.find(it => it.name === name);
  if (!item) return;
  item.qty += delta;

  if (item.qty <= 0) {
    removeFromCart(name);
  } else {
    updateCart();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  // Homepage: show only 3 products
  if (document.getElementById('home-list')) {
    loadProducts('home-list', 3);
  }

  // Shop page: show all products
  if (document.getElementById('shop-list')) {
    loadProducts('shop-list'); // no limit → all products
  }
});
// ===== UPDATE CART DISPLAY & COUNTS =====
function updateCart() {
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count in all #cart-count elements
  const countEls = document.querySelectorAll('#cart-count');
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  countEls.forEach(el => el.innerText = totalCount);

  // Update cart list if on cart page
  const cartList = document.getElementById('cart-list');
  if (cartList) {
    let html = '';
    if (cart.length === 0) {
      html = '<p>Your cart is empty.</p>';
    } else {
      cart.forEach(item => {
        html += `
          <div class="cart-item">
            <strong>${item.name}</strong> - ₱${item.price} x ${item.qty} = ₱${item.price * item.qty} <br>
            <button onclick="changeQty('${item.name}',1)">+</button>
            <button onclick="changeQty('${item.name}',-1)">-</button>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        `;
      });
    }
    cartList.innerHTML = html;
  }

  // Update cart total on cart, checkout, payment pages
  updateTotals();
}

// ===== UPDATE TOTALS =====
function updateTotals() {
  const totalPrice = cartTotal();

  const cartTotalEl = document.getElementById('cart-total');
  if (cartTotalEl) {
    cartTotalEl.innerText = totalPrice;
  }

  const checkoutTotalEl = document.getElementById('checkout-total');
  if (checkoutTotalEl) {
    checkoutTotalEl.innerText = totalPrice;
  }

  const paymentTotalEl = document.getElementById('payment-total');
  if (paymentTotalEl) {
    paymentTotalEl.innerText = totalPrice;
  }
}

// ===== CALCULATE CART TOTAL =====
function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ===== CLEAR CART =====
function clearCart() {
  cart = [];
  updateCart();
}

// ===== CHECKOUT FLOW =====
// Select payment method and go to payment page
function selectPayment(method) {
  if(cart.length === 0){
    alert('Your cart is empty! Add products before checkout.');
    window.location.href = 'cart.html';
    return;
  }
  localStorage.setItem('paymentMethod', method);
  window.location.href = 'payment.html';
}

// Display selected payment method on payment page
function showPaymentMethod() {
  const methodInfo = document.getElementById('method-info');
  const method = localStorage.getItem('paymentMethod');
  if (!methodInfo) return;

  if (method === 'credit') {
    methodInfo.innerText = 'Credit Card';
  } else if (method === 'paypal') {
    methodInfo.innerText = 'PayPal';
  } else {
    methodInfo.innerText = 'Gcash';
  }
}

// Complete payment and go to confirmation page
function completePayment() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    window.location.href = 'cart.html';
    return;
  }
  // Here you would add payment validation & processing
  // For demo, we just clear cart and redirect

  alert('Payment successful! Thank you for your order.');
  clearCart();
  localStorage.removeItem('paymentMethod');
  window.location.href = 'confirmation.html';
}

// ===== INITIALIZATION ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  updateCart();

  // Load products if containers exist
  if(document.getElementById('home-list')) {
    loadProducts('home-list');
  }
  if(document.getElementById('shop-list')) {
    loadProducts('shop-list');
  }

  // Show payment method if payment page
  if(document.getElementById('method-info')) {
    showPaymentMethod();
  }
});