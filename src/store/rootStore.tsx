import React, { createContext, useContext } from 'react';
import { CartStore } from './cart/CartStore';
import { UserStore } from './UserStore';
import { AddressStore } from './AddressStore';
import { PaymentStore } from './PaymentStore';
class RootStore {
  cart = new CartStore();
  user = new UserStore();
  address = new AddressStore();
  payment = new PaymentStore();
}
const root = new RootStore();

const StoreContext = createContext(root);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
);

export const useStores = () => useContext(StoreContext);
export type RootStoreType = RootStore;
