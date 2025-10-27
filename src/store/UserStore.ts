import { makeAutoObservable } from 'mobx';

import { DetailsFormData } from '../schema/detailsSchema';

export class UserStore {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  company: string = '';
  specialInstructions: string = '';
  userId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isComplete(): boolean {
    return !!(this.firstName && this.lastName && this.email && this.phone);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  setUserData(data: DetailsFormData) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.company = data.company || '';
    this.specialInstructions = data.specialInstructions || '';
  }

  setUserId(id: string) {
    this.userId = id;
  }

  toFormData(): DetailsFormData {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      company: this.company,
      specialInstructions: this.specialInstructions,
    };
  }

  clear() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.company = '';
    this.specialInstructions = '';
    this.userId = null;
  }
}
