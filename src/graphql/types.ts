// GraphQL Type Definitions for TypeScript

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    specialInstructions?: string;
    createdAt: string;
}

export interface Address {
    id: string;
    userId: string;
    streetAddress: string;
    apartmentSuite?: string;
    city: string;
    stateProvince: string;
    zipPostalCode: string;
    country: string;
    deliveryInstructions?: string;
    isDefault: boolean;
}

export interface CartItem {
    id: string;
    productId: string;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

export interface Cart {
    id: string;
    userId?: string;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

export interface PaymentMethod {
    id: string;
    userId: string;
    cardholderName: string;
    cardLastFour: string;
    cardBrand: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
}

export enum DeliveryMethod {
    STANDARD = 'STANDARD',
    EXPRESS = 'EXPRESS',
    NEXT_DAY = 'NEXT_DAY',
}

export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    user: User;
    shippingAddress: Address;
    billingAddress: Address;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    estimatedDeliveryStart: string;
    estimatedDeliveryEnd: string;
    createdAt: string;
}

export interface PaymentResult {
    success: boolean;
    message: string;
    order?: Order;
    transactionId?: string;
}

// Input Types

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    specialInstructions?: string;
}

export interface UpdateUserInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    specialInstructions?: string;
}

export interface CreateAddressInput {
    userId: string;
    streetAddress: string;
    apartmentSuite?: string;
    city: string;
    stateProvince: string;
    zipPostalCode: string;
    country: string;
    deliveryInstructions?: string;
    isDefault?: boolean;
}

export interface UpdateCartItemInput {
    cartId: string;
    productId: string;
    quantity: number;
}

export interface ProcessPaymentInput {
    userId: string;
    cartId: string;
    shippingAddressId: string;
    billingAddressId: string;
    cardNumber: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    deliveryMethod: DeliveryMethod;
}
