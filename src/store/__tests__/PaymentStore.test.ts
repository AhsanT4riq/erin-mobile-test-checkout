import { PaymentFormData } from '../../schema/paymentSchema';
import { PaymentStore } from '../PaymentStore';

describe('PaymentStore', () => {
  let store: PaymentStore;

  const mockPaymentData: PaymentFormData = {
    cardNumber: '4242424242424242',
    cardholderName: 'John Doe',
    expiryMonth: '12',
    expiryYear: '25',
    cvv: '123',
    billingAddressSameAsShipping: true,
    billingStreetAddress: '',
    billingCity: '',
    billingZipPostalCode: '',
  };

  const mockPaymentDataWithBilling: PaymentFormData = {
    cardNumber: '4242424242424242',
    cardholderName: 'John Doe',
    expiryMonth: '12',
    expiryYear: '25',
    cvv: '123',
    billingAddressSameAsShipping: false,
    billingStreetAddress: '456 Billing St',
    billingCity: 'Sydney',
    billingZipPostalCode: '2000',
  };

  beforeEach(() => {
    store = new PaymentStore();
  });

  describe('Initialization', () => {
    it('should initialize with empty strings for card fields', () => {
      expect(store.cardNumber).toBe('');
      expect(store.cardholderName).toBe('');
      expect(store.expiryMonth).toBe('');
      expect(store.expiryYear).toBe('');
      expect(store.cvv).toBe('');
    });

    it('should initialize with empty strings for billing address fields', () => {
      expect(store.billingStreetAddress).toBe('');
      expect(store.billingCity).toBe('');
      expect(store.billingZipPostalCode).toBe('');
    });

    it('should initialize billingAddressSameAsShipping as true', () => {
      expect(store.billingAddressSameAsShipping).toBe(true);
    });

    it('should not be complete on initialization', () => {
      expect(store.isComplete).toBe(false);
    });
  });

  describe('Setting Payment Data - Same as Shipping', () => {
    it('should set all card fields correctly', () => {
      store.setPaymentData(mockPaymentData);

      expect(store.cardNumber).toBe('4242424242424242');
      expect(store.cardholderName).toBe('John Doe');
      expect(store.expiryMonth).toBe('12');
      expect(store.expiryYear).toBe('25');
      expect(store.cvv).toBe('123');
    });

    it('should set billingAddressSameAsShipping flag', () => {
      store.setPaymentData(mockPaymentData);

      expect(store.billingAddressSameAsShipping).toBe(true);
    });

    it('should handle undefined billing fields by setting empty string', () => {
      const dataWithUndefined: PaymentFormData = {
        ...mockPaymentData,
        billingStreetAddress: undefined,
        billingCity: undefined,
        billingZipPostalCode: undefined,
      };

      store.setPaymentData(dataWithUndefined);

      expect(store.billingStreetAddress).toBe('');
      expect(store.billingCity).toBe('');
      expect(store.billingZipPostalCode).toBe('');
    });

    it('should update isComplete when all required fields are set', () => {
      expect(store.isComplete).toBe(false);

      store.setPaymentData(mockPaymentData);

      expect(store.isComplete).toBe(true);
    });

    it('should not require billing address when same as shipping', () => {
      store.setPaymentData({
        ...mockPaymentData,
        billingAddressSameAsShipping: true,
        billingStreetAddress: '',
        billingCity: '',
        billingZipPostalCode: '',
      });

      expect(store.isComplete).toBe(true);
    });
  });

  describe('Setting Payment Data - Different Billing Address', () => {
    it('should set all fields including billing address', () => {
      store.setPaymentData(mockPaymentDataWithBilling);

      expect(store.cardNumber).toBe('4242424242424242');
      expect(store.cardholderName).toBe('John Doe');
      expect(store.billingAddressSameAsShipping).toBe(false);
      expect(store.billingStreetAddress).toBe('456 Billing St');
      expect(store.billingCity).toBe('Sydney');
      expect(store.billingZipPostalCode).toBe('2000');
    });

    it('should require billing address when different from shipping', () => {
      store.setPaymentData(mockPaymentDataWithBilling);

      expect(store.isComplete).toBe(true);
    });

    it('should be incomplete without billing street when different from shipping', () => {
      store.setPaymentData({
        ...mockPaymentDataWithBilling,
        billingStreetAddress: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without billing city when different from shipping', () => {
      store.setPaymentData({
        ...mockPaymentDataWithBilling,
        billingCity: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without billing zip when different from shipping', () => {
      store.setPaymentData({
        ...mockPaymentDataWithBilling,
        billingZipPostalCode: '',
      });

      expect(store.isComplete).toBe(false);
    });
  });

  describe('Form Data Conversion', () => {
    it('should convert to form data correctly with same billing', () => {
      store.setPaymentData(mockPaymentData);

      const formData = store.toFormData();

      expect(formData).toEqual({
        cardNumber: '4242424242424242',
        cardholderName: 'John Doe',
        expiryMonth: '12',
        expiryYear: '25',
        cvv: '123',
        billingAddressSameAsShipping: true,
        billingStreetAddress: '',
        billingCity: '',
        billingZipPostalCode: '',
      });
    });

    it('should convert to form data correctly with different billing', () => {
      store.setPaymentData(mockPaymentDataWithBilling);

      const formData = store.toFormData();

      expect(formData).toEqual(mockPaymentDataWithBilling);
    });
  });

  describe('Validation via isComplete - Same as Shipping', () => {
    it('should be incomplete without cardNumber', () => {
      store.setPaymentData({
        ...mockPaymentData,
        cardNumber: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without cardholderName', () => {
      store.setPaymentData({
        ...mockPaymentData,
        cardholderName: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without expiryMonth', () => {
      store.setPaymentData({
        ...mockPaymentData,
        expiryMonth: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without expiryYear', () => {
      store.setPaymentData({
        ...mockPaymentData,
        expiryYear: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without cvv', () => {
      store.setPaymentData({
        ...mockPaymentData,
        cvv: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be complete with all card fields when same as shipping', () => {
      store.setPaymentData(mockPaymentData);

      expect(store.isComplete).toBe(true);
    });

    it('should not require billing fields when same as shipping', () => {
      store.setPaymentData({
        ...mockPaymentData,
        billingAddressSameAsShipping: true,
        billingStreetAddress: '',
        billingCity: '',
        billingZipPostalCode: '',
      });

      expect(store.isComplete).toBe(true);
    });
  });

  describe('Validation via isComplete - Different Billing', () => {
    it('should require all billing fields when different from shipping', () => {
      store.setPaymentData(mockPaymentDataWithBilling);

      expect(store.isComplete).toBe(true);
    });

    it('should be incomplete without billing street when different', () => {
      store.setPaymentData({
        ...mockPaymentDataWithBilling,
        billingStreetAddress: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without billing city when different', () => {
      store.setPaymentData({
        ...mockPaymentDataWithBilling,
        billingCity: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without billing zip when different', () => {
      store.setPaymentData({
        ...mockPaymentDataWithBilling,
        billingZipPostalCode: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should still require card fields when billing different', () => {
      store.setPaymentData({
        ...mockPaymentDataWithBilling,
        cardNumber: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should validate both card and billing fields', () => {
      store.setPaymentData({
        ...mockPaymentDataWithBilling,
        cvv: '',
        billingCity: '',
      });

      expect(store.isComplete).toBe(false);
    });
  });

  describe('Clear Function', () => {
    beforeEach(() => {
      store.setPaymentData(mockPaymentDataWithBilling);
    });

    it('should clear all fields', () => {
      store.clear();

      expect(store.cardNumber).toBe('');
      expect(store.cardholderName).toBe('');
      expect(store.expiryMonth).toBe('');
      expect(store.expiryYear).toBe('');
      expect(store.cvv).toBe('');
      expect(store.billingAddressSameAsShipping).toBe(true);
      expect(store.billingStreetAddress).toBe('');
      expect(store.billingCity).toBe('');
      expect(store.billingZipPostalCode).toBe('');
    });

    it('should mark incomplete after clear', () => {
      expect(store.isComplete).toBe(true);

      store.clear();

      expect(store.isComplete).toBe(false);
    });
  });

  describe('Security Considerations', () => {
    it('should store full card number (not masked)', () => {
      store.setPaymentData(mockPaymentData);

      expect(store.cardNumber).toBe('4242424242424242');
      expect(store.cardNumber.length).toBe(16);
    });

    it('should store full CVV', () => {
      store.setPaymentData(mockPaymentData);

      expect(store.cvv).toBe('123');
    });
  });
});
