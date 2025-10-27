import React, { createContext, useContext } from 'react';

import { AddressStore } from './AddressStore';
import { CartStore } from './cart/CartStore';
import { OrderStore } from './OrderStore';
import { PaymentStore } from './PaymentStore';
import { UserStore } from './UserStore';

class RootStore {
  cart = new CartStore();
  user = new UserStore();
  address = new AddressStore();
  payment = new PaymentStore();
  order = new OrderStore();
}
const root = new RootStore();

const StoreContext = createContext(root);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
);

export const useStores = () => useContext(StoreContext);
export type RootStoreType = RootStore;
