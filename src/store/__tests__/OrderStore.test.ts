import { Order, OrderStatus } from '../../graphql/types';
import { OrderStore } from '../OrderStore';

describe('OrderStore', () => {
  let store: OrderStore;

  const mockOrder: Order = {
    id: 'order_123',
    orderNumber: 'ORD-2025-001',
    userId: 'user_123',
    user: {
      id: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+61412345678',
      createdAt: '2025-10-28T10:30:00Z',
    },
    shippingAddress: {
      id: 'address_123',
      userId: 'user_123',
      streetAddress: '123 Main St',
      apartmentSuite: 'Apt 4B',
      city: 'Melbourne',
      stateProvince: 'VIC',
      zipPostalCode: '3000',
      country: 'Australia',
      isDefault: true,
    },
    billingAddress: {
      id: 'address_123',
      userId: 'user_123',
      streetAddress: '123 Main St',
      apartmentSuite: 'Apt 4B',
      city: 'Melbourne',
      stateProvince: 'VIC',
      zipPostalCode: '3000',
      country: 'Australia',
      isDefault: true,
    },
    items: [
      {
        id: '1',
        productId: 'item_1',
        productName: 'Test Product 1',
        description: 'Description 1',
        price: 29.99,
        quantity: 2,
      },
      {
        id: '2',
        productId: 'item_2',
        productName: 'Test Product 2',
        description: 'Description 2',
        price: 49.99,
        quantity: 1,
      },
    ],
    subtotal: 109.97,
    shipping: 25.0,
    tax: 11.0,
    total: 145.97,
    status: OrderStatus.PENDING,
    paymentMethod: {
      id: 'payment_123',
      userId: 'user_123',
      cardholderName: 'John Doe',
      cardLastFour: '1234',
      cardBrand: 'VISA',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true,
    },
    estimatedDeliveryStart: '2025-11-01T00:00:00Z',
    estimatedDeliveryEnd: '2025-11-05T00:00:00Z',
    createdAt: '2025-10-28T10:30:00Z',
  };

  beforeEach(() => {
    store = new OrderStore();
  });

  describe('Initialization', () => {
    it('should initialize with null order', () => {
      expect(store.order).toBeNull();
    });

    it('should not have order on initialization', () => {
      expect(store.hasOrder).toBe(false);
    });

    it('should return empty string for orderNumber', () => {
      expect(store.orderNumber).toBe('');
    });

    it('should return 0 for orderTotal', () => {
      expect(store.orderTotal).toBe(0);
    });

    it('should return empty string for estimatedDeliveryStart', () => {
      expect(store.estimatedDeliveryStart).toBe('');
    });

    it('should return empty string for estimatedDeliveryEnd', () => {
      expect(store.estimatedDeliveryEnd).toBe('');
    });

    it('should return empty string for shippingAddress', () => {
      expect(store.shippingAddress).toBe('');
    });

    it('should return undefined for userInfo', () => {
      expect(store.userInfo).toBeUndefined();
    });

    it('should return empty array for orderItems', () => {
      expect(store.orderItems).toEqual([]);
    });

    it('should return current date for orderDate', () => {
      const now = new Date();
      const orderDate = store.orderDate;

      // Should be within 1 second of now
      expect(Math.abs(orderDate.getTime() - now.getTime())).toBeLessThan(1000);
    });
  });

  describe('Setting Order', () => {
    it('should set complete order', () => {
      store.setOrder(mockOrder);

      expect(store.order).toEqual(mockOrder);
    });

    it('should update hasOrder flag', () => {
      expect(store.hasOrder).toBe(false);

      store.setOrder(mockOrder);

      expect(store.hasOrder).toBe(true);
    });

    it('should extract order number', () => {
      store.setOrder(mockOrder);

      expect(store.orderNumber).toBe('ORD-2025-001');
    });

    it('should extract total amount', () => {
      store.setOrder(mockOrder);

      expect(store.orderTotal).toBe(145.97);
    });
  });

  describe('Order Number Getter', () => {
    it('should return empty string when no order', () => {
      expect(store.orderNumber).toBe('');
    });

    it('should return order number when order exists', () => {
      store.setOrder(mockOrder);

      expect(store.orderNumber).toBe('ORD-2025-001');
    });

    it('should handle different order number formats', () => {
      const orderWithDifferentNumber = {
        ...mockOrder,
        orderNumber: 'ORDER-2025-002',
      };

      store.setOrder(orderWithDifferentNumber);

      expect(store.orderNumber).toBe('ORDER-2025-002');
    });
  });

  describe('Order Total Getter', () => {
    it('should return 0 when no order', () => {
      expect(store.orderTotal).toBe(0);
    });

    it('should return total when order exists', () => {
      store.setOrder(mockOrder);

      expect(store.orderTotal).toBe(145.97);
    });

    it('should handle decimal totals correctly', () => {
      const orderWithDecimal = {
        ...mockOrder,
        total: 99.99,
      };

      store.setOrder(orderWithDecimal);

      expect(store.orderTotal).toBe(99.99);
    });
  });

  describe('Estimated Delivery Getters', () => {
    it('should return empty strings when no order', () => {
      expect(store.estimatedDeliveryStart).toBe('');
      expect(store.estimatedDeliveryEnd).toBe('');
    });

    it('should return delivery dates when order exists', () => {
      store.setOrder(mockOrder);

      expect(store.estimatedDeliveryStart).toBe('2025-11-01T00:00:00Z');
      expect(store.estimatedDeliveryEnd).toBe('2025-11-05T00:00:00Z');
    });
  });

  describe('Shipping Address Getter', () => {
    it('should return empty string when no order', () => {
      expect(store.shippingAddress).toBe('');
    });

    it('should format complete address with comma separation', () => {
      store.setOrder(mockOrder);

      expect(store.shippingAddress).toBe('123 Main St, Apt 4B, Melbourne, VIC, 3000, Australia');
    });
  });

  describe('User Info Getter', () => {
    it('should return undefined when no order', () => {
      expect(store.userInfo).toBeUndefined();
    });

    it('should return user object when order exists', () => {
      store.setOrder(mockOrder);

      expect(store.userInfo).toEqual({
        id: 'user_123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+61412345678',
        createdAt: '2025-10-28T10:30:00Z',
      });
    });
  });

  describe('Order Items Getter', () => {
    it('should return empty array when no order', () => {
      expect(store.orderItems).toEqual([]);
    });

    it('should return items array when order exists', () => {
      store.setOrder(mockOrder);

      expect(store.orderItems).toHaveLength(2);
      expect(store.orderItems[0].productName).toBe('Test Product 1');
      expect(store.orderItems[1].productName).toBe('Test Product 2');
    });
  });

  describe('Order Date Getter', () => {
    it('should return current date when no order', () => {
      const now = new Date();
      const orderDate = store.orderDate;

      expect(Math.abs(orderDate.getTime() - now.getTime())).toBeLessThan(1000);
    });

    it('should convert createdAt string to Date object', () => {
      store.setOrder(mockOrder);

      const orderDate = store.orderDate;

      expect(orderDate).toBeInstanceOf(Date);
      expect(orderDate.toISOString()).toBe('2025-10-28T10:30:00.000Z');
    });
  });

  describe('Has Order Flag', () => {
    it('should be false when no order', () => {
      expect(store.hasOrder).toBe(false);
    });

    it('should be true when order exists', () => {
      store.setOrder(mockOrder);

      expect(store.hasOrder).toBe(true);
    });
  });

  describe('Clear Function', () => {
    beforeEach(() => {
      store.setOrder(mockOrder);
    });

    it('should clear order data', () => {
      expect(store.order).not.toBeNull();

      store.clear();

      expect(store.order).toBeNull();
      expect(store.hasOrder).toBe(false);
    });

    it('should reset all computed properties to defaults', () => {
      store.clear();

      expect(store.orderNumber).toBe('');
      expect(store.orderTotal).toBe(0);
      expect(store.estimatedDeliveryStart).toBe('');
      expect(store.estimatedDeliveryEnd).toBe('');
      expect(store.shippingAddress).toBe('');
      expect(store.userInfo).toBeUndefined();
      expect(store.orderItems).toEqual([]);
    });
  });
});
