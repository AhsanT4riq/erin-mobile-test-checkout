import { makeAutoObservable } from 'mobx';

import { PaymentFormData } from '../schema/paymentSchema';

export class PaymentStore {
  cardNumber: string = '';
  cardholderName: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  cvv: string = '';
  billingAddressSameAsShipping: boolean = true;
  billingStreetAddress: string = '';
  billingCity: string = '';
  billingZipPostalCode: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  get isComplete(): boolean {
    if (this.billingAddressSameAsShipping) {
      return !!(
        this.cardNumber &&
        this.cardholderName &&
        this.expiryMonth &&
        this.expiryYear &&
        this.cvv
      );
    }

    return !!(
      this.cardNumber &&
      this.cardholderName &&
      this.expiryMonth &&
      this.expiryYear &&
      this.cvv &&
      this.billingStreetAddress &&
      this.billingCity &&
      this.billingZipPostalCode
    );
  }

  setPaymentData(data: PaymentFormData) {
    this.cardNumber = data.cardNumber;
    this.cardholderName = data.cardholderName;
    this.expiryMonth = data.expiryMonth;
    this.expiryYear = data.expiryYear;
    this.cvv = data.cvv;
    this.billingAddressSameAsShipping = data.billingAddressSameAsShipping;
    this.billingStreetAddress = data.billingStreetAddress || '';
    this.billingCity = data.billingCity || '';
    this.billingZipPostalCode = data.billingZipPostalCode || '';
  }

  toFormData(): PaymentFormData {
    return {
      cardNumber: this.cardNumber,
      cardholderName: this.cardholderName,
      expiryMonth: this.expiryMonth,
      expiryYear: this.expiryYear,
      cvv: this.cvv,
      billingAddressSameAsShipping: this.billingAddressSameAsShipping,
      billingStreetAddress: this.billingStreetAddress,
      billingCity: this.billingCity,
      billingZipPostalCode: this.billingZipPostalCode,
    };
  }

  clear() {
    this.cardNumber = '';
    this.cardholderName = '';
    this.expiryMonth = '';
    this.expiryYear = '';
    this.cvv = '';
    this.billingAddressSameAsShipping = true;
    this.billingStreetAddress = '';
    this.billingCity = '';
    this.billingZipPostalCode = '';
  }
}
