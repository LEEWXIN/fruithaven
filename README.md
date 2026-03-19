# 🍎 FruitHaven — Online Fruit Store

A full-stack web application for browsing and ordering fresh fruits online, built with Flask and SQLite.

> **Background:** This project started as a Java Swing desktop app during my Diploma in IT (2022), evolved into a static HTML/CSS website (2023), and has now been rebuilt as a proper full-stack web application — with real authentication, a database, and an admin dashboard.

---

## ✨ Features

### Customer
- **Browse & Filter** — 12 fruit varieties, filterable by Seasonal / Local / Imported
- **Shopping Cart** — Add, remove, and adjust quantities with live total (server-side session)
- **User Auth** — Register and login with hashed passwords (Werkzeug)
- **Checkout** — Delivery details form with multiple payment method options
- **Order History** — View all past orders with status tracking

### Admin
- **Dashboard** — Total orders, revenue, registered users, pending orders at a glance
- **Order Management** — Update order status (Pending → Processing → Shipped → Delivered)
- **User List** — View all registered accounts and their roles

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3, Flask |
| Database | SQLite (via Python `sqlite3`) |
| Auth | Werkzeug password hashing |
| Templating | Jinja2 |
| Styling | Custom CSS3 (no framework) |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts — Playfair Display + DM Sans |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/LEEWXIN/fruithaven.git
cd fruithaven
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the app
```bash
python app.py
```

### 4. Open in browser
```
http://127.0.0.1:5000
```

The database (`database.db`) is created automatically on first run, along with a default admin account.

---

## 🔑 Default Admin Account

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

> ⚠️ Change the admin password after first login in a production environment.

---

## 📁 Project Structure

```
fruithaven/
├── app.py                  # Flask routes and database logic
├── database.db             # SQLite database (auto-created)
├── requirements.txt
├── README.md
├── templates/
│   ├── base.html           # Shared layout (navbar, footer, flash messages)
│   ├── index.html          # Home page with featured products
│   ├── shop.html           # Full product catalogue with category filter
│   ├── cart.html           # Shopping cart
│   ├── checkout.html       # Delivery form + order summary
│   ├── orders.html         # Order history (logged-in users)
│   ├── login.html
│   ├── register.html
│   ├── about.html
│   ├── contact.html
│   └── admin.html          # Admin dashboard
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

---

## 📸 Pages

| Page | Description |
|------|-------------|
| `/` | Hero section + featured products |
| `/shop` | Full catalogue with category filter |
| `/cart` | Cart with quantity controls |
| `/checkout` | Delivery details + payment method |
| `/orders` | Personal order history |
| `/login` | Login with flash error messages |
| `/register` | Register with validation |
| `/about` | Brand story and values |
| `/contact` | Contact form |
| `/admin` | Admin-only dashboard |

---

## 🔮 Planned Improvements

- [ ] Product search and sort functionality
- [ ] Products managed from database (not hardcoded in templates)
- [ ] Email confirmation on order placement
- [ ] Pagination for orders and admin tables
- [ ] Deploy to a live server (Railway / Render)

---

## 📖 Project History

| Year | Version | Stack |
|------|---------|-------|
| 2022 | PackageFruit — Diploma project | Java Swing, hardcoded login |
| 2023 | Online Fruit Store — Internship prep | HTML, CSS, localStorage |
| 2025 | FruitHaven — This version | Flask, SQLite, real auth, admin dashboard |

---

## 👤 Author

**Lee Wen Xin**  
Bachelor of IT, Raffles University  
[GitHub](https://github.com/LEEWXIN/fruithaven)
