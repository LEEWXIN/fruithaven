# 🍎 FruitHaven — Online Fruit Store

A full-stack fruit ordering web application built with Python Flask and SQLite. Started as a personal project to revisit and improve upon earlier diploma-era projects.

---

## ✨ Features

- **User Auth** — Register and login with hashed passwords
- **Product Catalogue** — 12 fruit varieties with pricing, origin, and nutrition info
- **Shopping Cart** — Add, remove, and adjust quantities
- **Checkout** — Delivery details and payment method saved to database
- **Order History** — View all past orders with status tracking
- **Admin Dashboard** — View all orders, update status, manage users
- **Responsive Design** — Works on desktop and mobile
- **Filter by Category** — Seasonal, Local, Imported

---

## 🛠️ Tech Stack

| Layer    | Technology                    |
|----------|-------------------------------|
| Backend  | Python Flask                  |
| Database | SQLite (via Python `sqlite3`) |
| Auth     | Werkzeug password hashing     |
| Frontend | HTML5, CSS3, Vanilla JS       |
| Icons    | Font Awesome 6                |
| Fonts    | Google Fonts — Playfair Display + DM Sans |

---

## 📁 File Structure

```
fruithaven/
├── app.py                  # Flask routes and database logic
├── database.db             # SQLite database (auto-created on first run)
├── requirements.txt        # Python dependencies
├── README.md
├── templates/
│   ├── base.html           # Shared navbar, footer, flash messages
│   ├── index.html          # Homepage
│   ├── shop.html           # Product catalogue
│   ├── cart.html           # Shopping cart
│   ├── checkout.html       # Delivery form
│   ├── orders.html         # Order history
│   ├── login.html          # Login page
│   ├── register.html       # Register page
│   ├── about.html          # About page
│   ├── contact.html        # Contact form
│   └── admin.html          # Admin dashboard
└── static/
    ├── css/style.css
    └── js/main.js
```

---

## 🚀 Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/LEEWXIN/fruithaven.git
cd fruithaven
```

**2. Install dependencies**
```bash
pip install -r requirements.txt
```

**3. Run the app**
```bash
python app.py
```

**4. Open in browser**
```
http://localhost:5000
```

---

## 🔑 Default Admin Account

| Username | Password  |
|----------|-----------|
| admin    | admin123  |

Admin dashboard: `http://localhost:5000/admin`

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `/` | Hero section + featured products |
| `/shop` | Full product grid with category filter |
| `/cart` | Shopping cart with quantity controls |
| `/checkout` | Delivery info + payment method |
| `/orders` | Order history with status |
| `/about` | Brand story and values |
| `/contact` | Contact form |
| `/admin` | Admin dashboard (admin only) |

---

## 🔮 Planned Improvements

- [ ] Real fruit images
- [ ] Product management via admin (add/edit/delete)
- [ ] Search and sort on shop page
- [ ] Email confirmation on order

---

## 📖 Background

This is the third iteration of a fruit store project:

1. **PackageFruit** (2022) — Java Swing desktop app with hardcoded login, built during Diploma in IT at Sunway College
2. **Online Fruit Store** (2023) — Static HTML/CSS/JS version, built during internship preparation
3. **FruitHaven** (2025) — Full-stack Flask version with real database and authentication

---

## 👤 Author

**Lee Wen Xin**  
Bachelor of IT, Raffles University  
[GitHub](https://github.com/LEEWXIN)
