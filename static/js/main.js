// ── DATA ──────────────────────────────────────────────
const FRUITS = [
  {
    id: 1, name: "Envy Apple", origin: "New Zealand", emoji: "🍎",
    price: 10.00, unit: "pc", tag: "Seasonal",
    desc: "Contains protein, fat, carbohydrates, vitamin C, B1, B2, carotene and organic acids including calcium, phosphorus and iron.",
    recommended: "All people",
    avoid: "Patients with leukopenia, patients with prostate hypertrophy",
    category: "imported"
  },
  {
    id: 2, name: "Dragon Fruit", origin: "Malaysia", emoji: "🐲",
    price: 26.00, unit: "kg", tag: "Local",
    desc: "Rich in dietary fiber, promotes gastrointestinal peristalsis, helps digestion, reduces intestinal absorption of lipids.",
    recommended: "All people",
    avoid: "People with diarrhea, women during menstruation, people with phlegm-dampness",
    category: "local"
  },
  {
    id: 3, name: "Bing Cherry", origin: "USA", emoji: "🍒",
    price: 45.00, unit: "200g", tag: "Imported",
    desc: "Replenishes iron demand and promotes hemoglobin regeneration. Prevents iron deficiency anaemia and enhances physical and mental fitness.",
    recommended: "All people",
    avoid: "People with ulcer symptoms, diabetes, febrile diseases",
    category: "imported"
  },
  {
    id: 4, name: "Australian Blueberry", origin: "Australia", emoji: "🫐",
    price: 28.00, unit: "box", tag: "Imported",
    desc: "Rich in vitamins B, A, C, E, fibre, pectin and trace elements including calcium, phosphorus, potassium, manganese and zinc.",
    recommended: "All people",
    avoid: "Diarrhoea patients, diabetics, kidney or gallbladder disease",
    category: "imported"
  },
  {
    id: 5, name: "Navel Orange", origin: "Australia", emoji: "🍊",
    price: 15.00, unit: "3pc", tag: "Imported",
    desc: "Contains vitamins A, B, C, D and citric acid. Vitamin P and C strengthen capillary toughness; pectin reduces blood lipids.",
    recommended: "All people",
    avoid: "Patients with kidney disease, diabetics",
    category: "imported"
  },
  {
    id: 6, name: "Cameron Strawberry", origin: "Cameron Highlands", emoji: "🍓",
    price: 15.00, unit: "box", tag: "Local",
    desc: "Pectin and fibre help body fat decomposition, reduce cholesterol. Vitamins A, C, E prevent arteriosclerosis and high blood pressure.",
    recommended: "All people",
    avoid: "Gastrointestinal diseases, gallstones, cold body constitution",
    category: "local"
  },
  {
    id: 7, name: "Ya Pear", origin: "China", emoji: "🍐",
    price: 13.00, unit: "pc", tag: "Imported",
    desc: "Suitable for fever, cough, phlegm and indigestion. Pear peel clears the heart and moistens the lungs.",
    recommended: "All people",
    avoid: "Stomach acidity, weak spleen and stomach, frequent night urination",
    category: "imported"
  },
  {
    id: 8, name: "Yellow Peach", origin: "China", emoji: "🍑",
    price: 12.00, unit: "pc", tag: "Imported",
    desc: "Rich in protein, fat, sugar, calcium, phosphorus, iron and vitamins B and C. Beneficial for respiratory conditions.",
    recommended: "All people",
    avoid: "Diabetes, weak gastrointestinal function",
    category: "imported"
  },
  {
    id: 9, name: "Red Globe Grape", origin: "South Africa", emoji: "🍇",
    price: 18.00, unit: "500g", tag: "Imported",
    desc: "Contain minerals calcium, potassium, phosphorus, iron and many vitamins. Flavonoids cleanse the blood and protect the heart.",
    recommended: "All people",
    avoid: "Diabetes",
    category: "imported"
  },
  {
    id: 10, name: "Harum Manis Mango", origin: "Malaysia", emoji: "🥭",
    price: 18.00, unit: "kg", tag: "Seasonal",
    desc: "Vitamin C content 1.5 times that of papaya. Vitamin A and β-carotene are good for the eyes. Increases appetite and quenches thirst.",
    recommended: "All people",
    avoid: "Diabetes, asthma, frequent cough, people with allergies or skin diseases",
    category: "local"
  },
  {
    id: 11, name: "Avocado", origin: "Mexico", emoji: "🥑",
    price: 22.00, unit: "pc", tag: "Imported",
    desc: "Rich in unsaturated fatty acids. Contains vitamins A, C, and E — promotes hormone secretion and tissue health.",
    recommended: "All people",
    avoid: "Kidney disease patients, those on anticoagulant drugs",
    category: "imported"
  },
  {
    id: 12, name: "Green Kiwi", origin: "New Zealand", emoji: "🥝",
    price: 8.00, unit: "pc", tag: "Imported",
    desc: "Exceptionally rich in vitamin C — 92mg per 100g. Contains actinidin enzyme that aids protein digestion.",
    recommended: "All people",
    avoid: "People with kidney problems, those with latex allergy",
    category: "imported"
  }
];

// ── STATE ─────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('fh_cart') || '[]');
let currentFilter = 'all';
let currentPage = 'home';

// ── HELPERS ───────────────────────────────────────────
function saveCart() {
  localStorage.setItem('fh_cart', JSON.stringify(cart));
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function cartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function cartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

// ── NAVIGATION ────────────────────────────────────────
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  currentPage = page;
  window.scrollTo(0, 0);

  // close mobile menu
  document.querySelector('.mobile-menu').classList.remove('open');
}

// ── RENDER PRODUCTS ───────────────────────────────────
function renderProducts(filter = 'all') {
  currentFilter = filter;
  const grid = document.getElementById('product-grid');
  const filtered = filter === 'all' ? FRUITS : FRUITS.filter(f => f.category === filter || f.tag.toLowerCase() === filter);

  grid.innerHTML = filtered.map(f => `
    <div class="product-card" data-id="${f.id}">
      <div class="card-img">
        <span class="card-tag">${f.tag}</span>
        <span style="font-size:3rem">${f.emoji}</span>
      </div>
      <div class="card-body">
        <div class="card-name">${f.name}</div>
        <div class="card-origin">${f.origin}</div>
        <button class="card-info-btn" onclick="openModal(${f.id})">View nutrition info →</button>
        <div class="card-footer-row">
          <div class="card-price">RM ${f.price.toFixed(2)}<span> /${f.unit}</span></div>
          <button class="add-btn" onclick="addToCart(${f.id})">+</button>
        </div>
      </div>
    </div>
  `).join('');

  // update chips
  document.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('active', c.dataset.filter === filter);
  });
}

// ── CART ──────────────────────────────────────────────
function addToCart(id) {
  const fruit = FRUITS.find(f => f.id === id);
  if (!fruit) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name: fruit.name, emoji: fruit.emoji, price: fruit.price, unit: fruit.unit, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`${fruit.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  // badge
  const count = cartCount();
  document.getElementById('cart-count').textContent = count;

  // items list
  const container = document.getElementById('cart-items');
  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="ci-icon">${item.emoji}</div>
        <div class="ci-details">
          <div class="ci-name">${item.name}</div>
          <div class="ci-qty-row">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <div class="ci-price">RM ${(item.price * item.qty).toFixed(2)}</div>
        <button class="ci-del" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');
  }

  // total
  document.getElementById('cart-total').textContent = 'RM ' + cartTotal().toFixed(2);
}

// ── CART SIDEBAR ──────────────────────────────────────
function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

// ── MODAL ─────────────────────────────────────────────
function openModal(id) {
  const f = FRUITS.find(f => f.id === id);
  if (!f) return;
  document.getElementById('modal-icon').textContent = f.emoji;
  document.getElementById('modal-name').textContent = f.name;
  document.getElementById('modal-origin').textContent = f.origin;
  document.getElementById('modal-desc').textContent = f.desc;
  document.getElementById('modal-recommended').textContent = f.recommended;
  document.getElementById('modal-avoid').textContent = f.avoid;
  document.getElementById('modal-price').textContent = `RM ${f.price.toFixed(2)} / ${f.unit}`;
  document.getElementById('modal-add').onclick = () => { addToCart(id); closeModal(); };
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// ── AUTH MODAL ────────────────────────────────────────
function openAuth(tab = 'login') {
  document.getElementById('auth-overlay').classList.add('open');
  switchTab(tab);
}
function closeAuth() {
  document.getElementById('auth-overlay').classList.remove('open');
}
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('auth-login').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('auth-register').style.display = tab === 'register' ? 'block' : 'none';
}

// ── CHECKOUT ──────────────────────────────────────────
function checkout() {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }
  closeCart();
  navigate('checkout');
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkout-items');
  el.innerHTML = cart.map(item => `
    <div style="display:flex;justify-content:space-between;padding:0.6rem 0;border-bottom:1px solid var(--border);font-size:0.875rem;">
      <span>${item.emoji} ${item.name} × ${item.qty}</span>
      <span style="color:var(--gold)">RM ${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('') + `
    <div style="display:flex;justify-content:space-between;padding:0.75rem 0;font-weight:500;">
      <span>Total</span>
      <span style="font-family:'Playfair Display',serif;font-size:1.2rem">RM ${cartTotal().toFixed(2)}</span>
    </div>`;
}

function placeOrder() {
  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const address = document.getElementById('order-address').value.trim();
  if (!name || !phone || !address) {
    showToast('Please fill in all delivery details'); return;
  }
  const orderId = 'FH' + Date.now().toString().slice(-6);
  const orders = JSON.parse(localStorage.getItem('fh_orders') || '[]');
  orders.push({ id: orderId, items: [...cart], total: cartTotal(), name, phone, address, date: new Date().toLocaleDateString() });
  localStorage.setItem('fh_orders', JSON.stringify(orders));
  cart = [];
  saveCart();
  updateCartUI();
  showToast(`Order ${orderId} placed successfully!`);
  setTimeout(() => navigate('orders'), 1000);
}

// ── ORDERS ────────────────────────────────────────────
function renderOrders() {
  const orders = JSON.parse(localStorage.getItem('fh_orders') || '[]');
  const el = document.getElementById('orders-list');
  if (orders.length === 0) {
    el.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:3rem 0">No orders yet</p>';
    return;
  }
  el.innerHTML = [...orders].reverse().map(o => `
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:1.25rem;margin-bottom:1rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
        <span style="font-family:'Playfair Display',serif;color:var(--gold)">#${o.id}</span>
        <span style="font-size:0.75rem;color:var(--text-dim)">${o.date}</span>
      </div>
      <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem">
        ${o.items.map(i => `${i.emoji} ${i.name} ×${i.qty}`).join(' · ')}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:0.8rem;color:var(--text-dim)">📍 ${o.address}</span>
        <span style="font-family:'Playfair Display',serif">RM ${o.total.toFixed(2)}</span>
      </div>
    </div>
  `).join('');
}

// ── CONTACT FORM ──────────────────────────────────────
function submitContact(e) {
  e.preventDefault();
  showToast('Message sent! We\'ll get back to you soon.');
  e.target.reset();
}

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();

  // mobile toggle
  document.querySelector('.toggle-btn').addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.toggle('open');
  });

  // chip filters
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => renderProducts(chip.dataset.filter));
  });

  // close modals on overlay click
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.getElementById('auth-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeAuth();
  });

  // orders page: render when visited
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => {
      const page = el.dataset.page;
      if (page === 'orders') renderOrders();
      navigate(page);
    });
  });
});
