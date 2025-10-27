# GraphQL Client - Usage Guide

This folder contains all GraphQL-related code for the React Native application.

## Files Overview

### `client.ts`
Apollo Client configuration. Update the GraphQL endpoint here based on your environment:
- iOS Simulator: `http://localhost:4000/graphql`
- Android Emulator: `http://10.0.2.2:4000/graphql`
- Physical Device: `http://YOUR_IP:4000/graphql`

### `types.ts`
TypeScript type definitions that match the GraphQL schema. Use these types throughout your app for type safety.

### `queries.ts`
All GraphQL queries for fetching data:
- User queries
- Cart queries
- Address queries
- Order queries
- Payment method queries

### `mutations.ts`
All GraphQL mutations for modifying data:
- User mutations (create, update, delete)
- Address mutations (create, update, delete)
- Cart mutations (create, add, update, remove, clear)
- Payment mutation (process payment)
- Order mutations (cancel order)

### `hooks.ts`
Custom React hooks for easy GraphQL integration. These hooks wrap Apollo Client's `useQuery` and `useMutation` with proper TypeScript types.

## Quick Start

### 1. Import the Hook

```typescript
import { useCart, useProcessPayment } from './graphql/hooks';
```

### 2. Use in Component

```typescript
const MyComponent = () => {
  const { data, loading, error } = useCart(cartId);
  const [processPayment] = useProcessPayment();
  
  // Your component logic
};
```

## Example Usage

### Fetching Data with useQuery

```typescript
import { useCart } from './graphql/hooks';

const CartScreen = ({ cartId }) => {
  const { data, loading, error, refetch } = useCart(cartId);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      {data?.cart.items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <Text>Total: ${data?.cart.total}</Text>
    </View>
  );
};
```

### Executing Mutations

```typescript
import { useCreateUser } from './graphql/hooks';
import { useState } from 'react';

const DetailsScreen = () => {
  const [createUser, { loading, error }] = useCreateUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = async () => {
    try {
      const result = await createUser({
        variables: {
          input: formData
        }
      });
      
      const userId = result.data?.createUser.id;
      console.log('User created:', userId);
      
      // Navigate to next screen
      navigation.navigate('Address');
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  return (
    <View>
      <TextInput 
        value={formData.firstName}
        onChangeText={(text) => setFormData({...formData, firstName: text})}
        placeholder="First Name"
      />
      {/* More inputs... */}
      <Button onPress={handleSubmit} disabled={loading}>
        {loading ? 'Creating...' : 'Continue'}
      </Button>
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};
```

### Processing Payment

```typescript
import { useProcessPayment } from './graphql/hooks';
import { DeliveryMethod } from './graphql/types';

const PaymentScreen = ({ userId, cartId, addressId }) => {
  const [processPayment, { loading }] = useProcessPayment();
  
  const handlePayment = async () => {
    try {
      const result = await processPayment({
        variables: {
          input: {
            userId,
            cartId,
            shippingAddressId: addressId,
            billingAddressId: addressId,
            cardNumber: '4242424242424242',
            cardholderName: 'John Doe',
            expiryMonth: '12',
            expiryYear: '25',
            cvv: '123',
            deliveryMethod: DeliveryMethod.STANDARD,
          }
        }
      });

      const paymentResult = result.data?.processPayment;
      
      if (paymentResult?.success) {
        // Payment successful
        const order = paymentResult.order;
        navigation.navigate('ThankYou', { 
          orderNumber: order?.orderNumber 
        });
      } else {
        // Payment failed
        Alert.alert('Payment Failed', paymentResult?.message);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to process payment');
    }
  };

  return (
    <Button onPress={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : 'Place Order'}
    </Button>
  );
};
```

## Error Handling

Always handle errors appropriately:

```typescript
const { data, loading, error } = useCart(cartId);

if (error) {
  // Network error
  if (error.networkError) {
    return <Text>Network error. Please check your connection.</Text>;
  }
  
  // GraphQL error
  if (error.graphQLErrors.length > 0) {
    return <Text>Error: {error.graphQLErrors[0].message}</Text>;
  }
  
  // Generic error
  return <Text>Something went wrong</Text>;
}
```

## Loading States

Show loading indicators while queries/mutations are in progress:

```typescript
const { data, loading } = useCart(cartId);
const [updateCart, { loading: updating }] = useUpdateCartItem();

return (
  <View>
    {loading && <ActivityIndicator size="large" />}
    {data && (
      <ScrollView>
        {/* Cart content */}
      </ScrollView>
    )}
    <Button disabled={updating}>
      {updating ? 'Updating...' : 'Update Cart'}
    </Button>
  </View>
);
```

## Refetching Data

Refresh data after mutations:

```typescript
const { data, refetch } = useCart(cartId);
const [removeFromCart] = useRemoveFromCart();

const handleRemove = async (productId) => {
  await removeFromCart({
    variables: { cartId, productId }
  });
  
  // Refresh cart data
  refetch();
};
```

## Using with AsyncStorage

Store user/cart IDs for persistence:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save
const saveUserId = async (userId: string) => {
  await AsyncStorage.setItem('userId', userId);
};

// Load
const loadUserId = async () => {
  return await AsyncStorage.getItem('userId');
};

// Use in component
useEffect(() => {
  const loadData = async () => {
    const userId = await loadUserId();
    if (userId) {
      // Fetch user data
    }
  };
  loadData();
}, []);
```

## Test Card Numbers

Remember to use these for testing:

```typescript
const TEST_CARDS = {
  SUCCESS: '4242424242424242',
  DECLINED: '4000000000000002',
  INSUFFICIENT_FUNDS: '4000000000009995',
  EXPIRED: '4000000000000069',
};
```

## Type Safety

All hooks are fully typed. TypeScript will autocomplete and validate:

```typescript
// ✅ Correct
const { data } = useCart(cartId);
data?.cart.items.forEach(item => {
  console.log(item.productName); // Autocomplete works!
});

// ❌ TypeScript error
console.log(item.nonExistentField); // Error: Property doesn't exist
```

## Best Practices

1. **Skip queries when ID is not available**:
   ```typescript
   const { data } = useCart(cartId); // Automatically skips if cartId is undefined
   ```

2. **Handle loading states**:
   Always show loading indicators while fetching/mutating

3. **Handle errors gracefully**:
   Show user-friendly error messages

4. **Refetch after mutations**:
   Keep UI in sync with server data

5. **Use optimistic updates**:
   For better UX, update UI before server response

6. **Clean up on unmount**:
   Cancel pending requests when component unmounts

## Common Patterns

### Create-then-navigate pattern

```typescript
const handleCreateUser = async () => {
  const result = await createUser({ variables: { input } });
  const userId = result.data?.createUser.id;
  
  // Store for next screens
  await AsyncStorage.setItem('userId', userId);
  
  // Navigate
  navigation.navigate('Address');
};
```

### Chain mutations pattern

```typescript
const handleCheckout = async () => {
  // 1. Create user
  const userResult = await createUser({ variables: { input: userData } });
  const userId = userResult.data?.createUser.id;
  
  // 2. Create address
  const addressResult = await createAddress({ 
    variables: { input: { ...addressData, userId } } 
  });
  const addressId = addressResult.data?.createAddress.id;
  
  // 3. Process payment
  const paymentResult = await processPayment({
    variables: {
      input: {
        userId,
        cartId,
        shippingAddressId: addressId,
        billingAddressId: addressId,
        ...paymentData
      }
    }
  });
  
  if (paymentResult.data?.processPayment.success) {
    navigation.navigate('ThankYou');
  }
};
```

## Troubleshooting

**Network request failed**:
- Check if backend is running
- Verify endpoint URL in `client.ts`
- Check device/emulator network settings

**TypeScript errors**:
- Ensure you're using the correct types from `types.ts`
- Update types if schema changes

**Stale data**:
- Call `refetch()` after mutations
- Consider using `fetchPolicy: 'network-only'`

For more information, see the main GRAPHQL_SETUP.txt file in the root directory.
