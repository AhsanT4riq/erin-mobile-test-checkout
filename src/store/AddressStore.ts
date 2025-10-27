import { makeAutoObservable } from 'mobx';
import { DeliveryMethod } from '../graphql/types';
import { AddressFormData } from '../schema/addressSchema';

export class AddressStore {
  streetAddress: string = '';
  apartmentSuite: string = '';
  city: string = '';
  stateProvince: string = '';
  zipPostalCode: string = '';
  country: string = 'Australia';
  deliveryInstructions: string = '';
  deliveryMethod: DeliveryMethod = DeliveryMethod.STANDARD;
  addressId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isComplete(): boolean {
    return !!(
      this.streetAddress &&
      this.city &&
      this.stateProvince &&
      this.zipPostalCode &&
      this.country &&
      this.deliveryMethod
    );
  }

  get fullAddress(): string {
    const parts = [
      this.streetAddress,
      this.apartmentSuite,
      this.city,
      this.stateProvince,
      this.zipPostalCode,
      this.country,
    ].filter(Boolean);
    return parts.join(', ');
  }

  get shippingCost(): number {
    switch (this.deliveryMethod) {
      case DeliveryMethod.STANDARD:
        return 10.0;
      case DeliveryMethod.EXPRESS:
        return 25.0;
      case DeliveryMethod.NEXT_DAY:
        return 50.0;
      default:
        return 10.0;
    }
  }

  setAddressData(data: AddressFormData) {
    this.streetAddress = data.streetAddress;
    this.apartmentSuite = data.apartmentSuite || '';
    this.city = data.city;
    this.stateProvince = data.stateProvince;
    this.zipPostalCode = data.zipPostalCode;
    this.country = data.country;
    this.deliveryInstructions = data.deliveryInstructions || '';
    this.deliveryMethod = data.deliveryMethod;
  }

  setAddressId(id: string) {
    this.addressId = id;
  }

  toFormData(): AddressFormData {
    return {
      streetAddress: this.streetAddress,
      apartmentSuite: this.apartmentSuite,
      city: this.city,
      stateProvince: this.stateProvince,
      zipPostalCode: this.zipPostalCode,
      country: this.country,
      deliveryInstructions: this.deliveryInstructions,
      deliveryMethod: this.deliveryMethod,
    };
  }

  clear() {
    this.streetAddress = '';
    this.apartmentSuite = '';
    this.city = '';
    this.stateProvince = '';
    this.zipPostalCode = '';
    this.country = 'Australia';
    this.deliveryInstructions = '';
    this.deliveryMethod = DeliveryMethod.STANDARD;
    this.addressId = null;
  }
}
