import { DetailsFormData } from '../../schema/detailsSchema';
import { UserStore } from '../UserStore';

describe('UserStore', () => {
  let store: UserStore;

  const mockUserData: DetailsFormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+61412345678',
    company: 'Erin Living',
    specialInstructions: 'Please call before delivery',
  };

  beforeEach(() => {
    store = new UserStore();
  });

  describe('Initialization', () => {
    it('should initialize with empty strings', () => {
      expect(store.firstName).toBe('');
      expect(store.lastName).toBe('');
      expect(store.email).toBe('');
      expect(store.phone).toBe('');
      expect(store.company).toBe('');
      expect(store.specialInstructions).toBe('');
    });

    it('should initialize with null userId', () => {
      expect(store.userId).toBeNull();
    });

    it('should not be complete on initialization', () => {
      expect(store.isComplete).toBe(false);
    });
  });

  describe('Setting User Data', () => {
    it('should set all user fields correctly', () => {
      store.setUserData(mockUserData);

      expect(store.firstName).toBe('John');
      expect(store.lastName).toBe('Doe');
      expect(store.email).toBe('john.doe@example.com');
      expect(store.phone).toBe('+61412345678');
      expect(store.company).toBe('Erin Living');
      expect(store.specialInstructions).toBe('Please call before delivery');
    });

    it('should update isComplete when all required fields are set', () => {
      expect(store.isComplete).toBe(false);

      store.setUserData(mockUserData);

      expect(store.isComplete).toBe(true);
    });

    it('should handle undefined optional fields by setting empty string', () => {
      const dataWithoutOptionals: DetailsFormData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+61498765432',
        company: undefined,
        specialInstructions: undefined,
      };

      store.setUserData(dataWithoutOptionals);

      expect(store.company).toBe('');
      expect(store.specialInstructions).toBe('');
      expect(store.isComplete).toBe(true); // Still complete without optionals
    });
  });

  describe('User ID Management', () => {
    it('should set userId', () => {
      store.setUserId('user_123');

      expect(store.userId).toBe('user_123');
    });

    it('should maintain userId when setting user data', () => {
      store.setUserId('user_123');
      store.setUserData(mockUserData);

      expect(store.userId).toBe('user_123');
    });
  });

  describe('Form Data Conversion', () => {
    it('should convert to form data format correctly', () => {
      store.setUserData(mockUserData);

      const formData = store.toFormData();

      expect(formData).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+61412345678',
        company: 'Erin Living',
        specialInstructions: 'Please call before delivery',
      });
    });

    it('should reflect updates in form data', () => {
      store.setUserData(mockUserData);
      const before = store.toFormData();

      store.setUserData({
        ...mockUserData,
        firstName: 'Jane',
      });
      const after = store.toFormData();

      expect(before.firstName).toBe('John');
      expect(after.firstName).toBe('Jane');
    });
  });

  describe('Validation via isComplete', () => {
    it('should be incomplete without firstName', () => {
      store.setUserData({
        ...mockUserData,
        firstName: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without lastName', () => {
      store.setUserData({
        ...mockUserData,
        lastName: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without email', () => {
      store.setUserData({
        ...mockUserData,
        email: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be incomplete without phone', () => {
      store.setUserData({
        ...mockUserData,
        phone: '',
      });

      expect(store.isComplete).toBe(false);
    });

    it('should be complete with all required fields', () => {
      store.setUserData(mockUserData);

      expect(store.isComplete).toBe(true);
    });

    it('should be complete even without optional fields', () => {
      store.setUserData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+61412345678',
        company: '',
        specialInstructions: '',
      });

      expect(store.isComplete).toBe(true);
    });
  });

  describe('Clear Function', () => {
    beforeEach(() => {
      store.setUserData(mockUserData);
      store.setUserId('user_123');
    });

    it('should clear all user data', () => {
      store.clear();

      expect(store.firstName).toBe('');
      expect(store.lastName).toBe('');
      expect(store.email).toBe('');
      expect(store.phone).toBe('');
      expect(store.company).toBe('');
      expect(store.specialInstructions).toBe('');
      expect(store.userId).toBeNull();
      expect(store.isComplete).toBe(false);
    });
  });
});
