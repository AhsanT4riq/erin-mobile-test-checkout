import { gql } from '@apollo/client';

// User Queries
export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
      email
      phone
      company
      specialInstructions
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

// Cart Queries
export const GET_CART = gql`
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      userId
      items {
        id
        productId
        productName
        description
        price
        quantity
        imageUrl
      }
      subtotal
      shipping
      tax
      total
    }
  }
`;

export const GET_CART_BY_USER = gql`
  query GetCartByUser($userId: ID!) {
    cartByUser(userId: $userId) {
      id
      userId
      items {
        id
        productId
        productName
        description
        price
        quantity
        imageUrl
      }
      subtotal
      shipping
      tax
      total
    }
  }
`;

// Address Queries
export const GET_ADDRESS = gql`
  query GetAddress($addressId: ID!) {
    address(id: $addressId) {
      id
      userId
      streetAddress
      apartmentSuite
      city
      stateProvince
      zipPostalCode
      country
      deliveryInstructions
      isDefault
    }
  }
`;

export const GET_USER_ADDRESSES = gql`
  query GetUserAddresses($userId: ID!) {
    addressesByUser(userId: $userId) {
      id
      userId
      streetAddress
      apartmentSuite
      city
      stateProvince
      zipPostalCode
      country
      deliveryInstructions
      isDefault
    }
  }
`;

// Order Queries
export const GET_ORDER = gql`
  query GetOrder($orderId: ID!) {
    order(id: $orderId) {
      id
      orderNumber
      userId
      user {
        id
        firstName
        lastName
        email
        phone
      }
      shippingAddress {
        id
        streetAddress
        apartmentSuite
        city
        stateProvince
        zipPostalCode
        country
      }
      billingAddress {
        id
        streetAddress
        city
        stateProvince
        zipPostalCode
      }
      items {
        id
        productId
        productName
        description
        price
        quantity
      }
      subtotal
      shipping
      tax
      total
      paymentMethod {
        id
        cardholderName
        cardLastFour
        cardBrand
      }
      status
      estimatedDeliveryStart
      estimatedDeliveryEnd
      createdAt
    }
  }
`;

export const GET_ORDER_BY_NUMBER = gql`
  query GetOrderByNumber($orderNumber: String!) {
    orderByNumber(orderNumber: $orderNumber) {
      id
      orderNumber
      status
      total
      createdAt
    }
  }
`;

export const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: ID!) {
    ordersByUser(userId: $userId) {
      id
      orderNumber
      status
      total
      createdAt
      items {
        id
        productName
        quantity
      }
    }
  }
`;

// Payment Methods Query
export const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods($userId: ID!) {
    paymentMethods(userId: $userId) {
      id
      userId
      cardholderName
      cardLastFour
      cardBrand
      expiryMonth
      expiryYear
      isDefault
    }
  }
`;
