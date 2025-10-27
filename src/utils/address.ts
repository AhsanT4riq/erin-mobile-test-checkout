import { Address } from '../graphql/types';

export const formatAddress = (address: Address) => {
  return `${address.streetAddress}, ${address.city}, ${address.stateProvince}, ${address.zipPostalCode}, ${address.country}`;
};
