const { v4: uuidv4 } = require('uuid');
const {
    store,
    PAYMENT_CARDS,
    calculateCartTotals,
    getProduct,
} = require('../data/mockData');

const resolvers = {
    Query: {
        // User queries
        user: (_, { id }) => {
            return store.users.get(id) || null;
        },
        users: () => {
            return Array.from(store.users.values());
        },

        // Cart queries
        cart: (_, { id }) => {
            return store.carts.get(id) || null;
        },
        cartByUser: (_, { userId }) => {
            const carts = Array.from(store.carts.values());
            return carts.find(cart => cart.userId === userId) || null;
        },

        // Address queries
        address: (_, { id }) => {
            return store.addresses.get(id) || null;
        },
        addressesByUser: (_, { userId }) => {
            const addresses = Array.from(store.addresses.values());
            return addresses.filter(addr => addr.userId === userId);
        },

        // Order queries
        order: (_, { id }) => {
            return store.orders.get(id) || null;
        },
        orderByNumber: (_, { orderNumber }) => {
            const orders = Array.from(store.orders.values());
            return orders.find(order => order.orderNumber === orderNumber) || null;
        },
        ordersByUser: (_, { userId }) => {
            const orders = Array.from(store.orders.values());
            return orders.filter(order => order.userId === userId);
        },

        // Payment methods
        paymentMethods: (_, { userId }) => {
            const methods = Array.from(store.paymentMethods.values());
            return methods.filter(pm => pm.userId === userId);
        },
    },

    Mutation: {
        // User mutations
        createUser: (_, { input }) => {
            const userId = uuidv4();
            const user = {
                id: userId,
                ...input,
                createdAt: new Date().toISOString(),
            };
            store.users.set(userId, user);
            return user;
        },

        updateUser: (_, { id, input }) => {
            const user = store.users.get(id);
            if (!user) {
                throw new Error('User not found');
            }
            const updatedUser = { ...user, ...input };
            store.users.set(id, updatedUser);
            return updatedUser;
        },

        deleteUser: (_, { id }) => {
            const deleted = store.users.delete(id);
            if (!deleted) {
                throw new Error('User not found');
            }
            return true;
        },

        // Address mutations
        createAddress: (_, { input }) => {
            const addressId = uuidv4();
            const address = {
                id: addressId,
                ...input,
                isDefault: input.isDefault || false,
            };

            // If this is set as default, unset other defaults for this user
            if (address.isDefault) {
                const userAddresses = Array.from(store.addresses.values())
                    .filter(addr => addr.userId === input.userId);
                userAddresses.forEach(addr => {
                    addr.isDefault = false;
                    store.addresses.set(addr.id, addr);
                });
            }

            store.addresses.set(addressId, address);
            return address;
        },

        updateAddress: (_, { id, input }) => {
            const address = store.addresses.get(id);
            if (!address) {
                throw new Error('Address not found');
            }
            const updatedAddress = { ...address, ...input };
            store.addresses.set(id, updatedAddress);
            return updatedAddress;
        },

        deleteAddress: (_, { id }) => {
            const deleted = store.addresses.delete(id);
            if (!deleted) {
                throw new Error('Address not found');
            }
            return true;
        },

        // Cart mutations
        createCart: (_, { userId }) => {
            const cartId = uuidv4();
            const cart = {
                id: cartId,
                userId: userId || null,
                items: [],
                subtotal: 0,
                shipping: 0,
                tax: 0,
                total: 0,
            };
            store.carts.set(cartId, cart);
            return cart;
        },

        addToCart: (_, { cartId, productId, quantity }) => {
            const cart = store.carts.get(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }

            const product = getProduct(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            // Check if item already exists in cart
            const existingItem = cart.items.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    id: uuidv4(),
                    productId: product.id,
                    productName: product.name,
                    description: product.description,
                    price: product.price,
                    quantity,
                    imageUrl: product.imageUrl,
                });
            }

            // Recalculate totals
            const totals = calculateCartTotals(cart.items);
            Object.assign(cart, totals);

            store.carts.set(cartId, cart);
            return cart;
        },

        updateCartItem: (_, { input }) => {
            const cart = store.carts.get(input.cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }

            const item = cart.items.find(item => item.productId === input.productId);
            if (!item) {
                throw new Error('Item not found in cart');
            }

            if (input.quantity <= 0) {
                // Remove item if quantity is 0 or negative
                cart.items = cart.items.filter(item => item.productId !== input.productId);
            } else {
                item.quantity = input.quantity;
            }

            // Recalculate totals
            const totals = calculateCartTotals(cart.items);
            Object.assign(cart, totals);

            store.carts.set(input.cartId, cart);
            return cart;
        },

        removeFromCart: (_, { cartId, productId }) => {
            const cart = store.carts.get(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = cart.items.filter(item => item.productId !== productId);

            // Recalculate totals
            const totals = calculateCartTotals(cart.items);
            Object.assign(cart, totals);

            store.carts.set(cartId, cart);
            return cart;
        },

        clearCart: (_, { cartId }) => {
            const cart = store.carts.get(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = [];
            cart.subtotal = 0;
            cart.shipping = 0;
            cart.tax = 0;
            cart.total = 0;

            store.carts.set(cartId, cart);
            return cart;
        },

        // Payment mutation
        processPayment: (_, { input }) => {
            // Validate user exists
            const user = store.users.get(input.userId);
            if (!user) {
                return {
                    success: false,
                    message: 'User not found. Please complete your details first.',
                    order: null,
                    transactionId: null,
                };
            }

            // Validate addresses
            const shippingAddress = store.addresses.get(input.shippingAddressId);
            const billingAddress = store.addresses.get(input.billingAddressId);

            if (!shippingAddress || !billingAddress) {
                return {
                    success: false,
                    message: 'Invalid address. Please check your shipping and billing addresses.',
                    order: null,
                    transactionId: null,
                };
            }

            // Get cart
            const cart = store.carts.get(input.cartId);
            if (!cart || cart.items.length === 0) {
                return {
                    success: false,
                    message: 'Cart is empty.',
                    order: null,
                    transactionId: null,
                };
            }

            // Validate card number format
            const cardNumber = input.cardNumber.replace(/\s/g, '');
            if (!/^\d{16}$/.test(cardNumber)) {
                return {
                    success: false,
                    message: 'Invalid card number format.',
                    order: null,
                    transactionId: null,
                };
            }

            // Validate expiry
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            const expiryYear = parseInt(input.expiryYear);
            const expiryMonth = parseInt(input.expiryMonth);

            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                return {
                    success: false,
                    message: 'Card has expired.',
                    order: null,
                    transactionId: null,
                };
            }

            // Test card numbers for different scenarios
            if (cardNumber === PAYMENT_CARDS.DECLINED) {
                return {
                    success: false,
                    message: 'Your card was declined. Please try a different payment method.',
                    order: null,
                    transactionId: uuidv4(),
                };
            }

            if (cardNumber === PAYMENT_CARDS.INSUFFICIENT_FUNDS) {
                return {
                    success: false,
                    message: 'Insufficient funds. Please try a different card.',
                    order: null,
                    transactionId: uuidv4(),
                };
            }

            if (cardNumber === PAYMENT_CARDS.EXPIRED) {
                return {
                    success: false,
                    message: 'This card has expired.',
                    order: null,
                    transactionId: uuidv4(),
                };
            }

            // Successful payment (for SUCCESS card or any other card number)
            if (cardNumber === PAYMENT_CARDS.SUCCESS || cardNumber !== PAYMENT_CARDS.DECLINED) {
                // Save payment method
                const paymentMethodId = uuidv4();
                const paymentMethod = {
                    id: paymentMethodId,
                    userId: input.userId,
                    cardholderName: input.cardholderName,
                    cardLastFour: cardNumber.slice(-4),
                    cardBrand: getCardBrand(cardNumber),
                    expiryMonth: input.expiryMonth,
                    expiryYear: input.expiryYear,
                    isDefault: true,
                };
                store.paymentMethods.set(paymentMethodId, paymentMethod);

                // Recalculate cart with delivery method
                const totals = calculateCartTotals(cart.items, input.deliveryMethod);

                // Calculate estimated delivery
                const today = new Date();
                let daysToAdd = 5;
                if (input.deliveryMethod === 'EXPRESS') daysToAdd = 2;
                if (input.deliveryMethod === 'NEXT_DAY') daysToAdd = 1;

                const deliveryStart = new Date(today);
                deliveryStart.setDate(deliveryStart.getDate() + daysToAdd);

                const deliveryEnd = new Date(deliveryStart);
                deliveryEnd.setDate(deliveryEnd.getDate() + 2);

                // Create order
                const orderId = uuidv4();
                const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 9999) + 1000}`;

                const order = {
                    id: orderId,
                    orderNumber,
                    userId: input.userId,
                    user,
                    shippingAddress,
                    billingAddress,
                    items: [...cart.items],
                    subtotal: totals.subtotal,
                    shipping: totals.shipping,
                    tax: totals.tax,
                    total: totals.total,
                    paymentMethod,
                    status: 'PROCESSING',
                    estimatedDeliveryStart: deliveryStart.toISOString(),
                    estimatedDeliveryEnd: deliveryEnd.toISOString(),
                    createdAt: new Date().toISOString(),
                };

                store.orders.set(orderId, order);

                // Clear the cart
                cart.items = [];
                cart.subtotal = 0;
                cart.shipping = 0;
                cart.tax = 0;
                cart.total = 0;
                store.carts.set(cart.id, cart);

                return {
                    success: true,
                    message: 'Payment successful! Your order has been placed.',
                    order,
                    transactionId: uuidv4(),
                };
            }

            // Default error
            return {
                success: false,
                message: 'Payment processing failed. Please try again.',
                order: null,
                transactionId: null,
            };
        },

        // Order mutations
        cancelOrder: (_, { orderId }) => {
            const order = store.orders.get(orderId);
            if (!order) {
                throw new Error('Order not found');
            }

            if (order.status === 'SHIPPED' || order.status === 'DELIVERED') {
                throw new Error('Cannot cancel order that has already shipped');
            }

            order.status = 'CANCELLED';
            store.orders.set(orderId, order);
            return order;
        },
    },
};

// Helper function to determine card brand
function getCardBrand(cardNumber) {
    const firstDigit = cardNumber[0];
    const firstTwoDigits = cardNumber.slice(0, 2);

    if (firstDigit === '4') return 'Visa';
    if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) return 'Mastercard';
    if (['34', '37'].includes(firstTwoDigits)) return 'American Express';
    if (firstTwoDigits === '60' || firstTwoDigits === '65') return 'Discover';

    return 'Unknown';
}

module.exports = resolvers;
