import { DeliveryMethod } from '../../graphql/types';
import { AddressFormData } from '../../schema/addressSchema';
import { AddressStore } from '../AddressStore';

describe('AddressStore', () => {
  let store: AddressStore;

  const mockAddressData: AddressFormData = {
    streetAddress: '123 Main St',
    apartmentSuite: 'Apt 4B',
    city: 'Melbourne',
    stateProvince: 'VIC',
    zipPostalCode: '3000',
    country: 'Australia',
    deliveryInstructions: 'Leave at door',
    deliveryMethod: DeliveryMethod.EXPRESS,
  };

  beforeEach(() => {
    store = new AddressStore();
  });

  describe('Initialization', () => {
    it('should initialize with empty strings', () => {
      expect(store.streetAddress).toBe('');
      expect(store.apartmentSuite).toBe('');
      expect(store.city).toBe('');
      expect(store.stateProvince).toBe('');
      expect(store.zipPostalCode).toBe('');
      expect(store.deliveryInstructions).toBe('');
    });

    it('should initialize country as "Australia"', () => {
      expect(store.country).toBe('Australia');
    });

    it('should initialize deliveryMethod as STANDARD', () => {
      expect(store.deliveryMethod).toBe(DeliveryMethod.STANDARD);
    });

    it('should initialize addressId as null', () => {
      expect(store.addressId).toBeNull();
    });

    it('should not be complete on initialization', () => {
      expect(store.isComplete).toBe(false);
    });

    it('should have default shipping cost of $10 (STANDARD)', () => {
      expect(store.shippingCost).toBe(10.0);
    });
  });

  describe('Setting Address Data', () => {
    it('should set all address fields correctly', () => {
      store.setAddressData(mockAddressData);

      expect(store.streetAddress).toBe('123 Main St');
      expect(store.apartmentSuite).toBe('Apt 4B');
      expect(store.city).toBe('Melbourne');
      expect(store.stateProvince).toBe('VIC');
      expect(store.zipPostalCode).toBe('3000');
      expect(store.country).toBe('Australia');
      expect(store.deliveryInstructions).toBe('Leave at door');
      expect(store.deliveryMethod).toBe(DeliveryMethod.EXPRESS);
    });

    it('should update isComplete when all required fields are set', () => {
      expect(store.isComplete).toBe(false);

      store.setAddressData(mockAddressData);

      expect(store.isComplete).toBe(true);
    });

    it('should handle all optional fields as undefined', () => {
      const minimalData: AddressFormData = {
        streetAddress: '123 Main St',
        apartmentSuite: undefined,
        city: 'Melbourne',
        stateProvince: 'VIC',
        zipPostalCode: '3000',
        country: 'Australia',
        deliveryInstructions: undefined,
        deliveryMethod: DeliveryMethod.STANDARD,
      };

      store.setAddressData(minimalData);

      expect(store.apartmentSuite).toBe('');
      expect(store.deliveryInstructions).toBe('');
      expect(store.isComplete).toBe(true);
    });
  });

  describe('Shipping Cost Calculation', () => {
    it('should return $10 for STANDARD delivery', () => {
      store.setAddressData({
        ...mockAddressData,
        deliveryMethod: DeliveryMethod.STANDARD,
      });

      expect(store.shippingCost).toBe(10.0);
    });

    it('should return $25 for EXPRESS delivery', () => {
      store.setAddressData({
        ...mockAddressData,
        deliveryMethod: DeliveryMethod.EXPRESS,
      });

      expect(store.shippingCost).toBe(25.0);
    });

    it('should return $50 for NEXT_DAY delivery', () => {
      store.setAddressData({
        ...mockAddressData,
        deliveryMethod: DeliveryMethod.NEXT_DAY,
      });

      expect(store.shippingCost).toBe(50.0);
    });

    it('should default to $10 for initial state', () => {
      expect(store.shippingCost).toBe(10.0);
    });
  });

  describe('Address ID Management', () => {
    it('should set addressId', () => {
      store.setAddressId('addr_123');

      expect(store.addressId).toBe('addr_123');
    });

    it('should maintain addressId when setting address data', () => {
      store.setAddressId('addr_123');
      store.setAddressData(mockAddressData);

      expect(store.addressId).toBe('addr_123');
    });
  });

  describe('Form Data Conversion', () => {
    beforeEach(() => {
      store.setAddressData(mockAddressData);
    });

    it('should convert to form data format correctly', () => {
      const formData = store.toFormData();

      expect(formData).toEqual({
        streetAddress: '123 Main St',
        apartmentSuite: 'Apt 4B',
        city: 'Melbourne',
        stateProvince: 'VIC',
        zipPostalCode: '3000',
        country: 'Australia',
        deliveryInstructions: 'Leave at door',
        deliveryMethod: DeliveryMethod.EXPRESS,
      });
    });

    it('should reflect updates in form data', () => {
      const before = store.toFormData();

      store.setAddressData({
        ...mockAddressData,
        city: 'Sydney',
      });
      const after = store.toFormData();

      expect(before.city).toBe('Melbourne');
      expect(after.city).toBe('Sydney');
    });
  });

  describe('Validation via isComplete', () => {
    it('should be incomplete without streetAddress', () => {
      store.setAddressData({
        ...mockAddressData,
        streetAddress: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without city', () => {
      store.setAddressData({
        ...mockAddressData,
        city: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without stateProvince', () => {
      store.setAddressData({
        ...mockAddressData,
        stateProvince: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without zipPostalCode', () => {
      store.setAddressData({
        ...mockAddressData,
        zipPostalCode: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without country', () => {
      store.setAddressData({
        ...mockAddressData,
        country: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be complete with all required fields', () => {
      store.setAddressData(mockAddressData);

      expect(store.isComplete).toBe(true);
    });

    it('should be complete even without optional fields', () => {
      store.setAddressData({
        streetAddress: '123 Main St',
        apartmentSuite: '',
        city: 'Melbourne',
        stateProvince: 'VIC',
        zipPostalCode: '3000',
        country: 'Australia',
        deliveryInstructions: '',
        deliveryMethod: DeliveryMethod.STANDARD,
      });

      expect(store.isComplete).toBe(true);
    });
  });

  describe('Clear Function', () => {
    beforeEach(() => {
      store.setAddressData(mockAddressData);
      store.setAddressId('addr_123');
    });

    it('should clear all address data', () => {
      store.clear();

      expect(store.streetAddress).toBe('');
      expect(store.apartmentSuite).toBe('');
      expect(store.city).toBe('');
      expect(store.stateProvince).toBe('');
      expect(store.zipPostalCode).toBe('');
      expect(store.country).toBe('Australia');
      expect(store.deliveryInstructions).toBe('');
      expect(store.deliveryMethod).toBe(DeliveryMethod.STANDARD);
      expect(store.addressId).toBeNull();
      expect(store.isComplete).toBe(false);
      expect(store.shippingCost).toBe(10.0);
    });
  });
});
