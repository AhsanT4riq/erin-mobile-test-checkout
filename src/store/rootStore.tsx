import React, { createContext, useContext } from 'react';
import { CartStore } from './cart/CartStore';

class RootStore {
  cart = new CartStore();
}
const root = new RootStore();

const StoreContext = createContext(root);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
);

export const useStores = () => useContext(StoreContext);
export type RootStoreType = RootStore;
