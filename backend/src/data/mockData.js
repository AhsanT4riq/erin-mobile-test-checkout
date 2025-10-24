const { v4: uuidv4 } = require('uuid');

// In-memory data store
const store = {
    users: new Map(),
    addresses: new Map(),
    carts: new Map(),
    orders: new Map(),
    paymentMethods: new Map(),
};

// Mock product catalog
const products = [
    {
        id: 'prod-1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality sound with active noise cancellation',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 'prod-2',
        name: 'Smart Watch Pro',
        description: 'Track your fitness and stay connected',
        price: 49.99,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 'prod-3',
        name: 'Portable Bluetooth Speaker',
        description: 'Waterproof design with 20-hour battery life',
        price: 19.99,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 'prod-4',
        name: 'USB-C Fast Charger',
        description: '65W fast charging for all your devices',
        price: 34.99,
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 'prod-5',
        name: 'Wireless Gaming Mouse',
        description: 'Precision gaming with RGB lighting',
        price: 59.99,
        imageUrl: 'https://via.placeholder.com/150',
    },
];

// Initialize a default cart with some items
const initializeDefaultCart = () => {
    const cartId = uuidv4();
    const cart = {
        id: cartId,
        userId: null,
        items: [
            {
                id: uuidv4(),
                productId: 'prod-1',
                productName: 'Premium Wireless Headphones',
                description: 'High-quality sound with active noise cancellation',
                price: 29.99,
                quantity: 1,
                imageUrl: 'https://via.placeholder.com/150',
            },
            {
                id: uuidv4(),
                productId: 'prod-2',
                productName: 'Smart Watch Pro',
                description: 'Track your fitness and stay connected',
                price: 49.99,
                quantity: 2,
                imageUrl: 'https://via.placeholder.com/150',
            },
            {
                id: uuidv4(),
                productId: 'prod-3',
                productName: 'Portable Bluetooth Speaker',
                description: 'Waterproof design with 20-hour battery life',
                price: 19.99,
                quantity: 1,
                imageUrl: 'https://via.placeholder.com/150',
            },
        ],
        subtotal: 149.96,
        shipping: 10.0,
        tax: 12.0,
        total: 171.96,
    };
    store.carts.set(cartId, cart);
    return cart;
};

// Payment test card numbers
const PAYMENT_CARDS = {
    SUCCESS: '4242424242424242', // Successful payment
    DECLINED: '4000000000000002', // Card declined
    INSUFFICIENT_FUNDS: '4000000000009995', // Insufficient funds
    EXPIRED: '4000000000000069', // Expired card
};

// Helper to calculate cart totals
const calculateCartTotals = (items, deliveryMethod = 'STANDARD') => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let shipping = 10.0;
    if (deliveryMethod === 'EXPRESS') shipping = 25.0;
    if (deliveryMethod === 'NEXT_DAY') shipping = 50.0;

    const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
    const total = Math.round((subtotal + shipping + tax) * 100) / 100;

    return { subtotal, shipping, tax, total };
};

// Get product by ID
const getProduct = (productId) => {
    return products.find(p => p.id === productId);
};

module.exports = {
    store,
    products,
    PAYMENT_CARDS,
    initializeDefaultCart,
    calculateCartTotals,
    getProduct,
};
