import { useQuery, useMutation, ApolloError } from '@apollo/client';
import {
    GET_USER,
    GET_CART,
    GET_CART_BY_USER,
    GET_USER_ADDRESSES,
    GET_ORDER,
    GET_USER_ORDERS,
    GET_PAYMENT_METHODS,
} from './queries';
import {
    CREATE_USER,
    UPDATE_USER,
    CREATE_ADDRESS,
    CREATE_CART,
    ADD_TO_CART,
    UPDATE_CART_ITEM,
    REMOVE_FROM_CART,
    CLEAR_CART,
    PROCESS_PAYMENT,
    CANCEL_ORDER,
} from './mutations';
import {
    User,
    Cart,
    Address,
    Order,
    PaymentMethod,
    CreateUserInput,
    UpdateUserInput,
    CreateAddressInput,
    UpdateCartItemInput,
    ProcessPaymentInput,
    PaymentResult,
} from './types';

// User Hooks
export const useUser = (userId: string) => {
    return useQuery<{ user: User }>(GET_USER, {
        variables: { userId },
        skip: !userId,
    });
};

export const useCreateUser = () => {
    return useMutation<{ createUser: User }, { input: CreateUserInput }>(CREATE_USER);
};

export const useUpdateUser = () => {
    return useMutation<{ updateUser: User }, { userId: string; input: UpdateUserInput }>(
        UPDATE_USER,
    );
};

// Cart Hooks
export const useCart = (cartId: string) => {
    return useQuery<{ cart: Cart }>(GET_CART, {
        variables: { cartId },
        skip: !cartId,
    });
};

export const useCartByUser = (userId: string) => {
    return useQuery<{ cartByUser: Cart }>(GET_CART_BY_USER, {
        variables: { userId },
        skip: !userId,
    });
};

export const useCreateCart = () => {
    return useMutation<{ createCart: Cart }, { userId?: string }>(CREATE_CART);
};

export const useAddToCart = () => {
    return useMutation<
        { addToCart: Cart },
        { cartId: string; productId: string; quantity: number }
    >(ADD_TO_CART);
};

export const useUpdateCartItem = () => {
    return useMutation<{ updateCartItem: Cart }, { input: UpdateCartItemInput }>(UPDATE_CART_ITEM);
};

export const useRemoveFromCart = () => {
    return useMutation<{ removeFromCart: Cart }, { cartId: string; productId: string }>(
        REMOVE_FROM_CART,
    );
};

export const useClearCart = () => {
    return useMutation<{ clearCart: Cart }, { cartId: string }>(CLEAR_CART);
};

// Address Hooks
export const useUserAddresses = (userId: string) => {
    return useQuery<{ addressesByUser: Address[] }>(GET_USER_ADDRESSES, {
        variables: { userId },
        skip: !userId,
    });
};

export const useCreateAddress = () => {
    return useMutation<{ createAddress: Address }, { input: CreateAddressInput }>(CREATE_ADDRESS);
};

// Order Hooks
export const useOrder = (orderId: string) => {
    return useQuery<{ order: Order }>(GET_ORDER, {
        variables: { orderId },
        skip: !orderId,
    });
};

export const useUserOrders = (userId: string) => {
    return useQuery<{ ordersByUser: Order[] }>(GET_USER_ORDERS, {
        variables: { userId },
        skip: !userId,
    });
};

export const useCancelOrder = () => {
    return useMutation<{ cancelOrder: Order }, { orderId: string }>(CANCEL_ORDER);
};

// Payment Hooks
export const usePaymentMethods = (userId: string) => {
    return useQuery<{ paymentMethods: PaymentMethod[] }>(GET_PAYMENT_METHODS, {
        variables: { userId },
        skip: !userId,
    });
};

export const useProcessPayment = () => {
    return useMutation<{ processPayment: PaymentResult }, { input: ProcessPaymentInput }>(
        PROCESS_PAYMENT,
    );
};

// Helper type for hook results
export type QueryResult<T> = {
    data?: T;
    loading: boolean;
    error?: ApolloError;
    refetch: () => void;
};

export type MutationResult<T, V> = [
    (variables: { variables: V }) => Promise<{ data?: T }>,
    {
        data?: T;
        loading: boolean;
        error?: ApolloError;
    },
];
