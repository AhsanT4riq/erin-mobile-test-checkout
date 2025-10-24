# Mobile Checkout - GraphQL Backend API

A complete mock GraphQL API for the Mobile Checkout application with full CRUD operations for users, addresses, carts, orders, and payment processing.

## Features

- ✅ Complete GraphQL schema with queries and mutations
- 🔐 User management (create, update, delete)
- 📍 Address management with default address support
- 🛒 Shopping cart with add, update, remove operations
- 💳 Payment processing with test card numbers
- 📦 Order management with tracking
- 🧪 In-memory data store (no database required)
- 🎯 Business logic for payment validation

## Test Credit Card Numbers

Use these test card numbers to simulate different payment scenarios:

| Card Number          | Result              | Description                    |
|---------------------|---------------------|--------------------------------|
| 4242424242424242    | ✅ Success          | Payment will be successful     |
| 4000000000000002    | ❌ Declined         | Card will be declined          |
| 4000000000009995    | 💰 Insufficient     | Insufficient funds error       |
| 4000000000000069    | 📅 Expired          | Card expired error             |

## Installation

```bash
cd backend
npm install
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on http://localhost:4000

## Endpoints

- **GraphQL Endpoint**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/health
- **Initialize Test Cart**: http://localhost:4000/init-cart
- **API Documentation**: http://localhost:4000/

## GraphQL Schema Overview

### Types

- **User**: Customer information
- **Address**: Shipping and billing addresses
- **Cart**: Shopping cart with items
- **CartItem**: Individual products in cart
- **Order**: Completed orders
- **PaymentMethod**: Saved payment methods
- **PaymentResult**: Payment processing result

### Main Queries

```graphql
# Get user data
user(id: ID!): User
users: [User!]!

# Get cart
cart(id: ID!): Cart
cartByUser(userId: ID!): Cart

# Get addresses
address(id: ID!): Address
addressesByUser(userId: ID!): [Address!]!

# Get orders
order(id: ID!): Order
orderByNumber(orderNumber: String!): Order
ordersByUser(userId: ID!): [Order!]!

# Get payment methods
paymentMethods(userId: ID!): [PaymentMethod!]!
```

### Main Mutations

```graphql
# User operations
createUser(input: CreateUserInput!): User!
updateUser(id: ID!, input: UpdateUserInput!): User!

# Address operations
createAddress(input: CreateAddressInput!): Address!

# Cart operations
createCart(userId: ID): Cart!
addToCart(cartId: ID!, productId: ID!, quantity: Int!): Cart!
updateCartItem(input: UpdateCartItemInput!): Cart!
removeFromCart(cartId: ID!, productId: ID!): Cart!

# Payment
processPayment(input: ProcessPaymentInput!): PaymentResult!

# Order management
cancelOrder(orderId: ID!): Order!
```

## Example Usage Flow

### 1. Create a User

```graphql
mutation {
  createUser(input: {
    firstName: "John"
    lastName: "Doe"
    email: "john.doe@example.com"
    phone: "+1 (555) 123-4567"
    company: "Tech Corp"
  }) {
    id
    firstName
    lastName
    email
  }
}
```

### 2. Create Shipping Address

```graphql
mutation {
  createAddress(input: {
    userId: "user-id-from-step-1"
    streetAddress: "123 Main Street"
    apartmentSuite: "Apt 4B"
    city: "New York"
    stateProvince: "NY"
    zipPostalCode: "10001"
    country: "United States"
    isDefault: true
  }) {
    id
    streetAddress
    city
  }
}
```

### 3. Create a Cart

```graphql
mutation {
  createCart(userId: "user-id-from-step-1") {
    id
    items {
      id
    }
  }
}
```

### 4. Add Items to Cart

```graphql
mutation {
  addToCart(
    cartId: "cart-id-from-step-3"
    productId: "prod-1"
    quantity: 2
  ) {
    id
    items {
      productName
      price
      quantity
    }
    total
  }
}
```

### 5. Process Payment (Success)

```graphql
mutation {
  processPayment(input: {
    userId: "user-id"
    cartId: "cart-id"
    shippingAddressId: "address-id"
    billingAddressId: "address-id"
    cardNumber: "4242424242424242"
    cardholderName: "John Doe"
    expiryMonth: "12"
    expiryYear: "25"
    cvv: "123"
    deliveryMethod: STANDARD
  }) {
    success
    message
    transactionId
    order {
      id
      orderNumber
      total
      status
    }
  }
}
```

### 6. Process Payment (Failed - Declined Card)

```graphql
mutation {
  processPayment(input: {
    userId: "user-id"
    cartId: "cart-id"
    shippingAddressId: "address-id"
    billingAddressId: "address-id"
    cardNumber: "4000000000000002"
    cardholderName: "John Doe"
    expiryMonth: "12"
    expiryYear: "25"
    cvv: "123"
    deliveryMethod: STANDARD
  }) {
    success
    message
    transactionId
  }
}
```

## Available Products

The API comes with 5 pre-configured products:

1. **Premium Wireless Headphones** - $29.99 (prod-1)
2. **Smart Watch Pro** - $49.99 (prod-2)
3. **Portable Bluetooth Speaker** - $19.99 (prod-3)
4. **USB-C Fast Charger** - $34.99 (prod-4)
5. **Wireless Gaming Mouse** - $59.99 (prod-5)

## Delivery Methods

- **STANDARD**: 5-7 business days - $10.00
- **EXPRESS**: 2-3 business days - $25.00
- **NEXT_DAY**: 1 business day - $50.00

## Business Logic

### Payment Validation

The API validates:
- User must exist before payment
- Addresses must be valid
- Cart must not be empty
- Card number format (16 digits)
- Card expiry date (not expired)
- Test card numbers for different scenarios

### Cart Calculations

- **Subtotal**: Sum of all items (price × quantity)
- **Tax**: 8% of subtotal
- **Shipping**: Based on delivery method
- **Total**: Subtotal + Tax + Shipping

### Order Creation

When payment is successful:
1. Payment method is saved
2. Order is created with all details
3. Estimated delivery dates are calculated
4. Cart is cleared
5. Order status is set to "PROCESSING"

## Testing with GraphQL Playground

You can test the API using any GraphQL client:

1. **Apollo Studio**: https://studio.apollographql.com/sandbox
2. **Postman**: Import GraphQL endpoint
3. **Insomnia**: Create GraphQL request
4. **GraphiQL**: Browser-based GraphQL IDE

Or use the examples in the `examples/` folder:
- `queries.graphql` - Example queries
- `mutations.graphql` - Example mutations

## Error Handling

The API returns meaningful error messages:

- **User not found**: When processing payment without creating user first
- **Invalid address**: When address IDs are invalid
- **Cart is empty**: When trying to checkout with no items
- **Invalid card number**: When card format is incorrect
- **Card expired**: When expiry date is in the past
- **Card declined**: When using test decline card number
- **Insufficient funds**: When using test insufficient funds card

## Data Persistence

⚠️ **Note**: This is a mock API using in-memory storage. All data is lost when the server restarts. This is intentional for code testing purposes.

## Technologies Used

- Apollo Server 4
- Express.js
- GraphQL
- UUID for ID generation
- In-memory data store

## License

This project is for code testing purposes only.
