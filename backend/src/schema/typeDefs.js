const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    company: String
    specialInstructions: String
    createdAt: String!
  }

  type Address {
    id: ID!
    userId: ID!
    streetAddress: String!
    apartmentSuite: String
    city: String!
    stateProvince: String!
    zipPostalCode: String!
    country: String!
    deliveryInstructions: String
    isDefault: Boolean!
  }

  type CartItem {
    id: ID!
    productId: ID!
    productName: String!
    description: String!
    price: Float!
    quantity: Int!
    imageUrl: String
  }

  type Cart {
    id: ID!
    userId: ID
    items: [CartItem!]!
    subtotal: Float!
    shipping: Float!
    tax: Float!
    total: Float!
  }

  type PaymentMethod {
    id: ID!
    userId: ID!
    cardholderName: String!
    cardLastFour: String!
    cardBrand: String!
    expiryMonth: String!
    expiryYear: String!
    isDefault: Boolean!
  }

  type Order {
    id: ID!
    orderNumber: String!
    userId: ID!
    user: User!
    shippingAddress: Address!
    billingAddress: Address!
    items: [CartItem!]!
    subtotal: Float!
    shipping: Float!
    tax: Float!
    total: Float!
    paymentMethod: PaymentMethod!
    status: OrderStatus!
    estimatedDeliveryStart: String!
    estimatedDeliveryEnd: String!
    createdAt: String!
  }

  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
    FAILED
  }

  enum DeliveryMethod {
    STANDARD
    EXPRESS
    NEXT_DAY
  }

  type PaymentResult {
    success: Boolean!
    message: String!
    order: Order
    transactionId: String
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    company: String
    specialInstructions: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    company: String
    specialInstructions: String
  }

  input CreateAddressInput {
    userId: ID!
    streetAddress: String!
    apartmentSuite: String
    city: String!
    stateProvince: String!
    zipPostalCode: String!
    country: String!
    deliveryInstructions: String
    isDefault: Boolean
  }

  input UpdateCartItemInput {
    cartId: ID!
    productId: ID!
    quantity: Int!
  }

  input ProcessPaymentInput {
    userId: ID!
    cartId: ID!
    shippingAddressId: ID!
    billingAddressId: ID!
    cardNumber: String!
    cardholderName: String!
    expiryMonth: String!
    expiryYear: String!
    cvv: String!
    deliveryMethod: DeliveryMethod!
  }

  type Query {
    # User queries
    user(id: ID!): User
    users: [User!]!

    # Cart queries
    cart(id: ID!): Cart
    cartByUser(userId: ID!): Cart

    # Address queries
    address(id: ID!): Address
    addressesByUser(userId: ID!): [Address!]!

    # Order queries
    order(id: ID!): Order
    orderByNumber(orderNumber: String!): Order
    ordersByUser(userId: ID!): [Order!]!

    # Payment methods
    paymentMethods(userId: ID!): [PaymentMethod!]!
  }

  type Mutation {
    # User mutations
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    # Address mutations
    createAddress(input: CreateAddressInput!): Address!
    updateAddress(id: ID!, input: CreateAddressInput!): Address!
    deleteAddress(id: ID!): Boolean!

    # Cart mutations
    createCart(userId: ID): Cart!
    addToCart(cartId: ID!, productId: ID!, quantity: Int!): Cart!
    updateCartItem(input: UpdateCartItemInput!): Cart!
    removeFromCart(cartId: ID!, productId: ID!): Cart!
    clearCart(cartId: ID!): Cart!

    # Payment mutations
    processPayment(input: ProcessPaymentInput!): PaymentResult!

    # Order mutations
    cancelOrder(orderId: ID!): Order!
  }
`;

module.exports = typeDefs;
