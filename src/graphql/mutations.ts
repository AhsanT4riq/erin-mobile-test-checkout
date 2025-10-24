import { gql } from '@apollo/client';

// User Mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $input: UpdateUserInput!) {
    updateUser(id: $userId, input: $input) {
      id
      firstName
      lastName
      email
      phone
      company
      specialInstructions
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(id: $userId)
  }
`;

// Address Mutations
export const CREATE_ADDRESS = gql`
  mutation CreateAddress($input: CreateAddressInput!) {
    createAddress(input: $input) {
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

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($addressId: ID!, $input: CreateAddressInput!) {
    updateAddress(id: $addressId, input: $input) {
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

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($addressId: ID!) {
    deleteAddress(id: $addressId)
  }
`;

// Cart Mutations
export const CREATE_CART = gql`
  mutation CreateCart($userId: ID) {
    createCart(userId: $userId) {
      id
      userId
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
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($cartId: ID!, $productId: ID!, $quantity: Int!) {
    addToCart(cartId: $cartId, productId: $productId, quantity: $quantity) {
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

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      id
      userId
      items {
        id
        productId
        productName
        price
        quantity
      }
      subtotal
      shipping
      tax
      total
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartId: ID!, $productId: ID!) {
    removeFromCart(cartId: $cartId, productId: $productId) {
      id
      userId
      items {
        id
        productId
        productName
        price
        quantity
      }
      subtotal
      shipping
      tax
      total
    }
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart($cartId: ID!) {
    clearCart(cartId: $cartId) {
      id
      items {
        id
      }
      subtotal
      shipping
      tax
      total
    }
  }
`;

// Payment Mutation
export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($input: ProcessPaymentInput!) {
    processPayment(input: $input) {
      success
      message
      transactionId
      order {
        id
        orderNumber
        userId
        user {
          firstName
          lastName
          email
        }
        shippingAddress {
          streetAddress
          apartmentSuite
          city
          stateProvince
          zipPostalCode
          country
        }
        billingAddress {
          streetAddress
          city
          stateProvince
          zipPostalCode
        }
        items {
          id
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
  }
`;

// Order Mutations
export const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: ID!) {
    cancelOrder(orderId: $orderId) {
      id
      orderNumber
      status
    }
  }
`;
