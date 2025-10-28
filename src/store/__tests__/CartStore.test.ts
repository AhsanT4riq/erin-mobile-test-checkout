import { Product } from '../../types/product';
import { CartStore } from '../cart/CartStore';

// Helper to build a product
const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: overrides.id ?? 'line-1',
  productId: overrides.productId ?? 'p-1',
  productName: overrides.productName ?? 'Test Product',
  price: overrides.price ?? 25.5,
  description: overrides.description ?? 'A product for testing',
});

describe('CartStore', () => {
  let store: CartStore;

  beforeEach(() => {
    store = new CartStore();
  });

  it('Initialization', () => {
    expect(store.cartId).toBeNull();
    expect(store.cartCreationError).toBeNull();
    expect(store.items).toEqual([]);
    expect(store.itemCount).toBe(0);
    expect(store.subtotal).toBe(0);
    expect(store.tax).toBe(0);
    expect(store.isEmpty).toBe(true);
    expect(store.getTotal(10)).toBe(10); // shipping only
  });

  it('setCartId and setCartCreationError', () => {
    store.setCartId('cart-123');
    expect(store.cartId).toBe('cart-123');

    store.setCartCreationError('failed to create cart');
    expect(store.cartCreationError).toBe('failed to create cart');

    store.setCartCreationError(null);
    expect(store.cartCreationError).toBeNull();
  });

  it('addItem adds a new line and computes totals', () => {
    const product = makeProduct({ price: 20 });
    store.addItem(product);

    expect(store.items).toHaveLength(1);
    expect(store.itemCount).toBe(1);
    expect(store.subtotal).toBe(20);
    expect(store.tax).toBe(+(20 * 0.1).toFixed(2));
    expect(store.isEmpty).toBe(false);
    expect(store.getTotal(5)).toBe(+(20 + 5 + 20 * 0.1).toFixed(2));
  });

  it('addItem increments existing line when same product added again', () => {
    const product = makeProduct({ price: 30 });
    store.addItem(product);
    store.addItem(product);

    expect(store.items).toHaveLength(1);
    expect(store.itemCount).toBe(2);
    expect(store.subtotal).toBe(60);
    expect(store.tax).toBe(+(60 * 0.1).toFixed(2));
  });

  it('increment increases quantity by n', () => {
    const p = makeProduct({ productId: 'p-xyz', price: 10 });
    store.addItem(p); // qty 1
    store.increment('p-xyz', 3); // +3 => 4

    expect(store.itemCount).toBe(4);
    expect(store.subtotal).toBe(40);
  });

  it('removeItem deletes a line', () => {
    const p1 = makeProduct({ productId: 'p-1', price: 10 });
    const p2 = makeProduct({ id: 'line-2', productId: 'p-2', price: 5 });

    store.addItem(p1);
    store.addItem(p2);
    expect(store.items).toHaveLength(2);

    store.removeItem('p-1');
    expect(store.items).toHaveLength(1);
    expect(store.items[0].productId).toBe('p-2');
  });

  it('clearCart resets all state', () => {
    const p = makeProduct({ price: 12 });
    store.setCartId('cart-1');
    store.setCartCreationError('oops');
    store.addItem(p);

    store.clearCart();

    expect(store.cartId).toBeNull();
    expect(store.cartCreationError).toBeNull();
    expect(store.items).toHaveLength(0);
    expect(store.itemCount).toBe(0);
    expect(store.subtotal).toBe(0);
    expect(store.tax).toBe(0);
    expect(store.isEmpty).toBe(true);
  });
});
