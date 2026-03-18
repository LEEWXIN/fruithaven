from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3, json

app = Flask(__name__)
app.secret_key = 'fruithaven-2025'

DB = 'database.db'

# ── DATABASE ──────────────────────────────────────────
def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT    UNIQUE NOT NULL,
        password TEXT    NOT NULL,
        role     TEXT    DEFAULT 'user',
        created  TEXT    DEFAULT CURRENT_TIMESTAMP
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS orders (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id  INTEGER NOT NULL,
        username TEXT    NOT NULL,
        items    TEXT    NOT NULL,
        total    REAL    NOT NULL,
        name     TEXT    NOT NULL,
        phone    TEXT    NOT NULL,
        address  TEXT    NOT NULL,
        payment  TEXT    NOT NULL,
        status   TEXT    DEFAULT 'Pending',
        created  TEXT    DEFAULT CURRENT_TIMESTAMP
    )''')

    # default admin account
    if not conn.execute("SELECT id FROM users WHERE username='admin'").fetchone():
        conn.execute("INSERT INTO users (username, password, role) VALUES (?,?,?)",
                     ('admin', generate_password_hash('admin123'), 'admin'))
    conn.commit()
    conn.close()

# ── HOME ──────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')

# ── AUTH ──────────────────────────────────────────────
@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        return redirect(url_for('index'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()

        if not username or not password:
            flash('Please fill in all fields.', 'error')
            return render_template('login.html')

        conn = get_db()
        user = conn.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
        conn.close()

        if not user or not check_password_hash(user['password'], password):
            flash('Invalid username or password.', 'error')
            return render_template('login.html')

        session['user_id']  = user['id']
        session['username'] = user['username']
        session['role']     = user['role']
        flash(f"Welcome back, {username}!", 'success')

        if user['role'] == 'admin':
            return redirect(url_for('admin'))
        return redirect(url_for('index'))

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'user_id' in session:
        return redirect(url_for('index'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        confirm  = request.form.get('confirm', '').strip()

        if not username or not password or not confirm:
            flash('Please fill in all fields.', 'error')
            return render_template('register.html')
        if len(username) < 3:
            flash('Username must be at least 3 characters.', 'error')
            return render_template('register.html')
        if len(password) < 6:
            flash('Password must be at least 6 characters.', 'error')
            return render_template('register.html')
        if password != confirm:
            flash('Passwords do not match.', 'error')
            return render_template('register.html')

        conn = get_db()
        if conn.execute("SELECT id FROM users WHERE username=?", (username,)).fetchone():
            conn.close()
            flash('Username already taken.', 'error')
            return render_template('register.html')

        conn.execute("INSERT INTO users (username, password) VALUES (?,?)",
                     (username, generate_password_hash(password)))
        conn.commit()
        user = conn.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
        conn.close()

        session['user_id']  = user['id']
        session['username'] = user['username']
        session['role']     = user['role']
        flash(f"Account created! Welcome, {username}!", 'success')
        return redirect(url_for('index'))

    return render_template('register.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'success')
    return redirect(url_for('index'))

# ── SHOP ──────────────────────────────────────────────
@app.route('/shop')
def shop():
    category = request.args.get('category', 'all')
    return render_template('shop.html', category=category)

# ── CART ──────────────────────────────────────────────
@app.route('/cart')
def cart():
    cart_items = session.get('cart', [])
    total = sum(item['price'] * item['qty'] for item in cart_items)
    return render_template('cart.html', cart=cart_items, total=total)

@app.route('/cart/add', methods=['POST'])
def cart_add():
    fruit_id   = int(request.form.get('fruit_id'))
    fruit_name = request.form.get('fruit_name')
    fruit_emoji= request.form.get('fruit_emoji')
    price      = float(request.form.get('price'))
    unit       = request.form.get('unit')
    redirect_to= request.form.get('redirect_to', 'shop')

    cart = session.get('cart', [])
    for item in cart:
        if item['id'] == fruit_id:
            item['qty'] += 1
            session['cart'] = cart
            flash(f"{fruit_name} quantity updated.", 'success')
            return redirect(url_for(redirect_to))

    cart.append({'id': fruit_id, 'name': fruit_name, 'emoji': fruit_emoji,
                 'price': price, 'unit': unit, 'qty': 1})
    session['cart'] = cart
    flash(f"{fruit_name} added to cart!", 'success')
    return redirect(url_for(redirect_to))

@app.route('/cart/update', methods=['POST'])
def cart_update():
    fruit_id = int(request.form.get('fruit_id'))
    action   = request.form.get('action')
    cart     = session.get('cart', [])

    for item in cart:
        if item['id'] == fruit_id:
            if action == 'increase':
                item['qty'] += 1
            elif action == 'decrease':
                item['qty'] -= 1
                if item['qty'] <= 0:
                    cart.remove(item)
            elif action == 'remove':
                cart.remove(item)
            break

    session['cart'] = cart
    return redirect(url_for('cart'))

# ── CHECKOUT ──────────────────────────────────────────
@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if 'user_id' not in session:
        flash('Please log in to checkout.', 'error')
        return redirect(url_for('login'))

    cart_items = session.get('cart', [])
    if not cart_items:
        flash('Your cart is empty.', 'error')
        return redirect(url_for('shop'))

    total = sum(item['price'] * item['qty'] for item in cart_items)

    if request.method == 'POST':
        name    = request.form.get('name', '').strip()
        phone   = request.form.get('phone', '').strip()
        address = request.form.get('address', '').strip()
        payment = request.form.get('payment', '')

        if not name or not phone or not address:
            flash('Please fill in all delivery details.', 'error')
            return render_template('checkout.html', cart=cart_items, total=total)

        conn = get_db()
        conn.execute(
            "INSERT INTO orders (user_id, username, items, total, name, phone, address, payment) VALUES (?,?,?,?,?,?,?,?)",
            (session['user_id'], session['username'], json.dumps(cart_items), total, name, phone, address, payment)
        )
        conn.commit()
        order_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
        conn.close()

        session['cart'] = []
        flash(f"Order #FH{order_id:05d} placed successfully!", 'success')
        return redirect(url_for('orders'))

    return render_template('checkout.html', cart=cart_items, total=total)

# ── ORDERS ────────────────────────────────────────────
@app.route('/orders')
def orders():
    if 'user_id' not in session:
        flash('Please log in to view your orders.', 'error')
        return redirect(url_for('login'))

    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM orders WHERE user_id=? ORDER BY created DESC",
        (session['user_id'],)
    ).fetchall()
    conn.close()

    order_list = []
    for r in rows:
        order_list.append({
            'id':      f"FH{r['id']:05d}",
            'items':   json.loads(r['items']),
            'total':   r['total'],
            'name':    r['name'],
            'address': r['address'],
            'payment': r['payment'],
            'status':  r['status'],
            'created': r['created']
        })

    return render_template('orders.html', orders=order_list)

# ── ABOUT / CONTACT ───────────────────────────────────
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        flash("Message sent! We'll get back to you soon.", 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

# ── ADMIN ─────────────────────────────────────────────
@app.route('/admin')
def admin():
    if session.get('role') != 'admin':
        flash('Admin access required.', 'error')
        return redirect(url_for('index'))

    conn = get_db()
    orders     = conn.execute("SELECT * FROM orders ORDER BY created DESC").fetchall()
    users      = conn.execute("SELECT id, username, role, created FROM users").fetchall()
    total_rev  = conn.execute("SELECT COALESCE(SUM(total),0) FROM orders").fetchone()[0]
    pending    = conn.execute("SELECT COUNT(*) FROM orders WHERE status='Pending'").fetchone()[0]
    conn.close()

    order_list = []
    for r in orders:
        order_list.append({
            'id':      f"FH{r['id']:05d}",
            'raw_id':  r['id'],
            'username':r['username'],
            'items':   json.loads(r['items']),
            'total':   r['total'],
            'name':    r['name'],
            'phone':   r['phone'],
            'address': r['address'],
            'payment': r['payment'],
            'status':  r['status'],
            'created': r['created']
        })

    return render_template('admin.html',
        orders=order_list, users=users,
        total_revenue=round(total_rev, 2), pending_orders=pending
    )

@app.route('/admin/update_status', methods=['POST'])
def update_status():
    if session.get('role') != 'admin':
        return redirect(url_for('index'))
    order_id = request.form.get('order_id')
    status   = request.form.get('status')
    conn = get_db()
    conn.execute("UPDATE orders SET status=? WHERE id=?", (status, order_id))
    conn.commit()
    conn.close()
    flash(f"Order #FH{int(order_id):05d} updated to {status}.", 'success')
    return redirect(url_for('admin'))

# ── RUN ───────────────────────────────────────────────
if __name__ == '__main__':
    init_db()
    app.run(debug=True)
