// Product Data
const products = [
    {
        id: 1,
        name: "Amber Noir",
        category: "women",
        price: 2499,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
        description: "A mysterious blend of amber, vanilla, and sandalwood",
        rating: 4.8,
        reviews: 124,
        inStock: true
    },
    {
        id: 2,
        name: "Velvet Bloom",
        category: "women",
        price: 2199,
        image: "https://images.unsplash.com/photo-1592945403244-b3faa5b613b0?w=400&h=400&fit=crop",
        description: "Delicate floral notes with a hint of musk",
        rating: 4.6,
        reviews: 89,
        inStock: true
    },
    {
        id: 3,
        name: "Ocean Breeze",
        category: "unisex",
        price: 1899,
        image: "https://images.unsplash.com/photo-1615639164213-aab04da93c7c?w=400&h=400&fit=crop",
        description: "Fresh aquatic notes with citrus undertones",
        rating: 4.7,
        reviews: 156,
        inStock: true
    },
    {
        id: 4,
        name: "Midnight Whisper",
        category: "men",
        price: 2799,
        image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop",
        description: "Bold and sophisticated with leather and tobacco notes",
        rating: 4.9,
        reviews: 203,
        inStock: true
    },
    {
        id: 5,
        name: "Rose Garden",
        category: "women",
        price: 1999,
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901354?w=400&h=400&fit=crop",
        description: "Romantic rose petals with jasmine and lily",
        rating: 4.5,
        reviews: 67,
        inStock: true
    },
    {
        id: 6,
        name: "Citrus Burst",
        category: "unisex",
        price: 1699,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        description: "Zesty lemon and bergamot with green tea",
        rating: 4.4,
        reviews: 92,
        inStock: true
    },
    {
        id: 7,
        name: "Luxury Gift Set",
        category: "gift",
        price: 3999,
        image: "https://images.unsplash.com/photo-1602928321679-711a32c5b97c?w=400&h=400&fit=crop",
        description: "Premium collection of our best-selling fragrances",
        rating: 4.9,
        reviews: 45,
        inStock: true
    },
    {
        id: 8,
        name: "Mystic Woods",
        category: "men",
        price: 2599,
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
        description: "Deep forest notes with cedar and pine",
        rating: 4.7,
        reviews: 78,
        inStock: true
    }
];

// Shopping Cart
let cart = [];
let currentFilter = 'all';

// User Authentication
let currentUser = null;
let users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@uamore.com",
        password: "admin123",
        isAdmin: true
    },
    {
        id: 2,
        name: "Demo User",
        email: "demo@example.com",
        password: "demo123",
        isAdmin: false
    }
];

// Orders
let orders = [
    {
        id: "ORD001",
        customerId: 2,
        customerName: "Demo User",
        items: [
            { productId: 1, name: "Amber Noir", quantity: 2, price: 2499 }
        ],
        total: 4998,
        status: "Delivered",
        date: "2024-01-15"
    }
];

// Wishlist
let wishlist = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutItems = document.getElementById('checkoutItems');
const checkoutTotal = document.getElementById('checkoutTotal');
const authModal = document.getElementById('authModal');
const profileModal = document.getElementById('profileModal');
const adminModal = document.getElementById('adminModal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupEventListeners();
    updateCartCount();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', openSearchModal);
    document.getElementById('searchClose').addEventListener('click', closeSearchModal);
    searchInput.addEventListener('input', handleSearch);

    // Cart functionality
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('checkoutBtn').addEventListener('click', openCheckoutModal);

    // Checkout functionality
    document.getElementById('checkoutClose').addEventListener('click', closeCheckoutModal);
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);

    // Newsletter subscription
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletter);

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // User authentication
    document.getElementById('userBtn').addEventListener('click', openAuthModal);
    document.getElementById('authClose').addEventListener('click', closeAuthModal);
    document.getElementById('switchToSignUp').addEventListener('click', switchToSignUp);
    document.getElementById('switchToSignIn').addEventListener('click', switchToSignIn);
    document.getElementById('signInForm').addEventListener('submit', handleSignIn);
    document.getElementById('signUpForm').addEventListener('submit', handleSignUp);
    
    // Profile modal
    document.getElementById('profileClose').addEventListener('click', closeProfileModal);
    
    // Admin functionality
    document.getElementById('adminBtn').addEventListener('click', openAdminModal);
    document.getElementById('adminClose').addEventListener('click', closeAdminModal);
    
    // Payment method selection
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', togglePaymentDetails);
    });
    
    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', switchAdminTab);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === searchModal) closeSearchModal();
        if (e.target === checkoutModal) closeCheckoutModal();
        if (e.target === authModal) closeAuthModal();
        if (e.target === profileModal) closeProfileModal();
        if (e.target === adminModal) closeAdminModal();
    });
    
    // Load user session
    loadUserSession();
}

// Display Products
function displayProducts(filteredProducts = products) {
    productGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x400?text=No+Image';">
        </div>
        <div class="product-info">
            <h4>${product.name}</h4>
            <div class="product-rating">
                ${generateStars(product.rating)} (${product.reviews})
            </div>
            <div class="product-price">₹${product.price.toLocaleString()}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-actions">
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="quick-view" onclick="quickView(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="view-details" onclick="viewProductDetails(${product.id})">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star" style="color: #d4af37;"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt" style="color: #d4af37;"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star" style="color: #d4af37;"></i>';
    }
    
    return stars;
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    let filteredProducts;
    
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    displayProducts(filteredProducts);
    
    // Update active navigation
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[onclick="filterProducts('${category}')"]`)?.classList.add('active');
}

// Sort Products
function sortProducts() {
    const sortBy = document.getElementById('sortSelect').value;
    let sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Featured - keep original order
            break;
    }
    
    displayProducts(sortedProducts);
}

// Search Functionality
function openSearchModal() {
    searchModal.style.display = 'flex';
    searchInput.focus();
}

function closeSearchModal() {
    searchModal.style.display = 'none';
    searchInput.value = '';
}

function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    displayProducts(filteredProducts);
}

// Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
    saveCartToLocalStorage();
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h5>${item.name}</h5>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total.toLocaleString()}`;
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
}

function closeCart() {
    cartSidebar.classList.remove('open');
}

// Checkout Functionality
function openCheckoutModal() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    updateCheckoutDisplay();
    checkoutModal.style.display = 'flex';
    closeCart();
}

function closeCheckoutModal() {
    checkoutModal.style.display = 'none';
}

function updateCheckoutDisplay() {
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #eee;';
        
        checkoutItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <div style="color: #666; font-size: 0.9rem;">Qty: ${item.quantity}</div>
            </div>
            <div>₹${(item.price * item.quantity).toLocaleString()}</div>
        `;
        
        checkoutItems.appendChild(checkoutItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `₹${total.toLocaleString()}`;
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Simulate order processing
    showNotification('Processing your order...', 'info');
    
    setTimeout(() => {
        showNotification('Order placed successfully! Thank you for shopping with Uamore.', 'success');
        cart = [];
        updateCart();
        closeCheckoutModal();
        
        // Reset form
        e.target.reset();
    }, 2000);
}

// Newsletter Subscription
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

// Quick View Functionality
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create and show quick view modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 2rem; max-width: 500px; width: 90%; position: relative;">
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
            <h3>${product.name}</h3>
            <div style="margin: 0.5rem 0;">${generateStars(product.rating)} (${product.reviews} reviews)</div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #d4af37; margin: 1rem 0;">₹${product.price.toLocaleString()}</div>
            <p style="color: #666; margin-bottom: 1.5rem;">${product.description}</p>
            <button onclick="addToCart(${product.id}); this.closest('div[style*=\"position: fixed\"]').remove()" style="width: 100%; padding: 1rem; background: #d4af37; color: white; border: none; border-radius: 5px; cursor: pointer;">Add to Cart</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        z-index: 3000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('uamoreCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('uamoreCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Auth Functions
function openAuthModal() {
    if (currentUser) {
        openProfileModal();
    } else {
        authModal.style.display = 'flex';
        document.getElementById('signInForm').style.display = 'block';
        document.getElementById('signUpForm').style.display = 'none';
        document.getElementById('authTitle').textContent = 'Sign In';
    }
}

function closeAuthModal() {
    authModal.style.display = 'none';
}

function switchToSignUp(e) {
    e.preventDefault();
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
    document.getElementById('authTitle').textContent = 'Sign Up';
}

function switchToSignIn(e) {
    e.preventDefault();
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('signInForm').style.display = 'block';
    document.getElementById('authTitle').textContent = 'Sign In';
}

function handleSignIn(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        saveUserSession();
        closeAuthModal();
        updateUserInterface();
        showNotification('Welcome back, ' + user.name + '!', 'success');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleSignUp(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already exists', 'error');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        isAdmin: false
    };
    
    users.push(newUser);
    currentUser = newUser;
    saveUserSession();
    closeAuthModal();
    updateUserInterface();
    showNotification('Account created successfully!', 'success');
}

function openProfileModal() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userEmail').textContent = currentUser.email;
        profileModal.style.display = 'flex';
    }
}

function closeProfileModal() {
    profileModal.style.display = 'none';
}

function signOut() {
    currentUser = null;
    localStorage.removeItem('uamoreUser');
    updateUserInterface();
    closeProfileModal();
    showNotification('Signed out successfully', 'success');
}

function updateUserInterface() {
    const userBtn = document.getElementById('userBtn');
    const adminBtn = document.getElementById('adminBtn');
    
    if (currentUser) {
        userBtn.innerHTML = '<i class="fas fa-user"></i>';
        if (currentUser.isAdmin) {
            adminBtn.style.display = 'block';
        } else {
            adminBtn.style.display = 'none';
        }
    } else {
        userBtn.innerHTML = '<i class="fas fa-user"></i>';
        adminBtn.style.display = 'none';
    }
}

function saveUserSession() {
    localStorage.setItem('uamoreUser', JSON.stringify(currentUser));
}

function loadUserSession() {
    const savedUser = localStorage.getItem('uamoreUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
}

// Admin Panel
function openAdminModal() {
    if (currentUser && currentUser.isAdmin) {
        adminModal.style.display = 'flex';
        loadAdminData();
    } else {
        showNotification('Access denied', 'error');
    }
}

function closeAdminModal() {
    adminModal.style.display = 'none';
}

function switchAdminTab(e) {
    const tabName = e.target.dataset.tab;
    
    // Update active tab
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update active content
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
}

function loadAdminData() {
    loadAdminProducts();
    loadAdminOrders();
    loadAdminUsers();
}

function loadAdminProducts() {
    const tbody = document.getElementById('adminProductsTable');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price.toLocaleString()}</td>
            <td>${product.inStock ? 'In Stock' : 'Out of Stock'}</td>
            <td>
                <button onclick="editProduct(${product.id})" class="btn-secondary">Edit</button>
                <button onclick="deleteProduct(${product.id})" class="btn-outline">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadAdminOrders() {
    const tbody = document.getElementById('adminOrdersTable');
    tbody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.items.length} items</td>
            <td>₹${order.total.toLocaleString()}</td>
            <td><span class="status-${order.status.toLowerCase()}">${order.status}</span></td>
            <td>
                <button onclick="viewOrder('${order.id}')" class="btn-secondary">View</button>
                <button onclick="updateOrderStatus('${order.id}')" class="btn-outline">Update</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadAdminUsers() {
    const tbody = document.getElementById('adminUsersTable');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const userOrders = orders.filter(order => order.customerId === user.id);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${userOrders.length}</td>
            <td>${user.isAdmin ? 'Admin' : 'Customer'}</td>
            <td>
                <button onclick="viewUser(${user.id})" class="btn-secondary">View</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addNewProduct() {
    showNotification('Add Product feature will be available soon!', 'info');
}

function editProduct(productId) {
    showNotification('Edit Product feature will be available soon!', 'info');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        showNotification('Product deleted successfully!', 'success');
        loadAdminProducts();
    }
}

function viewOrder(orderId) {
    showNotification('View Order feature will be available soon!', 'info');
}

function updateOrderStatus(orderId) {
    showNotification('Update Order Status feature will be available soon!', 'info');
}

function viewUser(userId) {
    showNotification('View User feature will be available soon!', 'info');
}

// Payment
function togglePaymentDetails() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const cardDetails = document.getElementById('cardDetails');
    
    if (paymentMethod === 'card') {
        cardDetails.classList.add('active');
    } else {
        cardDetails.classList.remove('active');
    }
}

// Product Details
function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 2rem; max-width: 800px; width: 90%; position: relative; max-height: 90vh; overflow-y: auto;">
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 10px;">
                </div>
                <div>
                    <h2>${product.name}</h2>
                    <div style="margin: 1rem 0;">${generateStars(product.rating)} (${product.reviews} reviews)</div>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--accent-color); margin: 1rem 0;">₹${product.price.toLocaleString()}</div>
                    <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <h4>Product Details</h4>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;"><strong>Category:</strong> ${product.category}</li>
                            <li style="margin-bottom: 0.5rem;"><strong>Availability:</strong> ${product.inStock ? 'In Stock' : 'Out of Stock'}</li>
                            <li style="margin-bottom: 0.5rem;"><strong>Rating:</strong> ${product.rating}/5</li>
                        </ul>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                        <button onclick="addToCart(${product.id}); this.closest('div[style*=\"position: fixed\"]').remove()" style="flex: 1; padding: 1rem; background: var(--gradient-accent); color: white; border: none; border-radius: 25px; cursor: pointer;">Add to Cart</button>
                        <button onclick="addToWishlist(${product.id})" style="padding: 1rem; background: transparent; color: var(--primary-color); border: 1px solid var(--primary-color); border-radius: 25px; cursor: pointer;">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Wishlist
function addToWishlist(productId) {
    if (!currentUser) {
        showNotification('Please sign in to add items to wishlist', 'error');
        return;
    }
    
    if (!wishlist.find(item => item.productId === productId)) {
        const product = products.find(p => p.id === productId);
        wishlist.push({ productId, userId: currentUser.id });
        showNotification('Added to wishlist!', 'success');
    } else {
        showNotification('Already in wishlist!', 'info');
    }
}

function showWishlist() {
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty', 'info');
        return;
    }
    
    showNotification('Wishlist feature will be available soon!', 'info');
}

function showOrderHistory() {
    const userOrders = orders.filter(order => order.customerId === currentUser.id);
    if (userOrders.length === 0) {
        showNotification('No orders found', 'info');
        return;
    }
    
    showNotification('Order history feature will be available soon!', 'info');
}

// Load cart on page load
loadCartFromLocalStorage();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .cart-item-quantity button {
        background: #f0f0f0;
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .cart-item-quantity button:hover {
        background: #e74c3c;
        color: white;
        transform: scale(1.1);
    }
    
    .remove-item {
        background: none;
        border: none;
        color: #f44336;
        cursor: pointer;
        padding: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .remove-item:hover {
        color: #d32f2f;
        transform: scale(1.2);
    }
    
    .product-rating {
        margin: 0.5rem 0;
        font-size: 0.9rem;
    }
    
    .product-description {
        color: #7f8c8d;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
    }
    
    .product-card {
        animation: fadeInUp 0.6s ease-out both;
    }
    
    .product-card:nth-child(1) { animation-delay: 0.1s; }
    .product-card:nth-child(2) { animation-delay: 0.2s; }
    .product-card:nth-child(3) { animation-delay: 0.3s; }
    .product-card:nth-child(4) { animation-delay: 0.4s; }
    .product-card:nth-child(5) { animation-delay: 0.5s; }
    .product-card:nth-child(6) { animation-delay: 0.6s; }
    .product-card:nth-child(7) { animation-delay: 0.7s; }
    .product-card:nth-child(8) { animation-delay: 0.8s; }
    
    .cart-item {
        animation: bounceIn 0.5s ease-out;
    }
    
    .notification {
        animation: bounceIn 0.5s ease-out;
    }
    
    .notification.error {
        animation: shake 0.5s ease-out;
    }
`;
document.head.appendChild(style); 