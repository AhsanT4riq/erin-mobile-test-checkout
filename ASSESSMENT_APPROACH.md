# Erin Mobile Checkout — Assessment Summary

## Overview

This project was provided as part of the **Erin Living Mobile Code Test**.  
The goal was to build and refine a **React Native mobile checkout flow** connected to a **GraphQL backend**, focusing on scalable architecture, clean state management, and reliable user experience.

---

## My Approach

### 1. Understanding the Requirements

I first reviewed the provided codebase and README to identify key expectations:

- Implement a complete checkout flow (cart → details → payment → confirmation)
- Use **MobX** for state management
- Integrate with the provided **GraphQL backend**
- Handle card payment scenarios:
  - Success
  - Declined
  - Insufficient funds
  - Expired card
- Follow clean architecture principles and ensure scalability

---

### 2. Setting Up the Environment

- Cloned the repository and confirmed both backend and mobile apps ran correctly.

---

### 3. State Management with MobX

- Created a dedicated `CartStore` using **MobX** to manage cart state.
- Created a dedicated `AddressStore` using **MobX** to manage address state.
- Created a dedicated `PaymentStore` using **MobX** to manage payment state.
- Created a dedicated `UserStore` using **MobX** to manage user state.
- Created a dedicated `OrderStore` using **MobX** to manage order state.
- Integrated MobX store with React Native screens using context for clean access.

---

### 4. Forms and Validation

- Introduced **React Hook Form** for managing form state.
- Added **Zod schemas** for input validation (name, email, address, and card details).
- Connected validation with form components for real-time error handling.
- Ensured consistent user feedback on invalid inputs.
- Created custom form components for scalability and reusability.

---

### 5. GraphQL Integration

- Connected the app to the local GraphQL backend.
- Implemented queries and mutations for:
  - Creating Cart
  - Adding items to cart
  - Removing items from cart
  - Updating items in cart
  - Clearing cart
  - Creating User
  - Creating Address
  - Processing Payment
  - Creating Order
- Added proper error handling and type safety using generated GraphQL types.

---

### 6. UI and User Experience

- Implemented KeyboardAwareScrollView for smoother form experience when typing.
- Implemented missing screens: Product.
- Implemented missing components:
  - Reusable components
  - Modals
  - Loaders
  - Error messages
- Ensured proper navigation flow across the checkout journey.
- Added modal-based error handling for declined and invalid card responses.
- Integrated **react-native-vector-icons** for consistent UI visuals.

---

### 7. Testing and Validation

- Created unit tests for MobX stores.
- Verified all four payment cases.
- Manually tested on both Android and iOS environments.

---

### 8. Tooling and Code Quality

- Configured **ESLint** and **Prettier** for code consistency.
- Cleaned up imports and unused files.
- Improved folder structure for clarity (`src/store`, `src/screens`, `src/hooks`, `src/types`, etc.).

---

## Key Improvements

- Strongly typed state and data handling using TypeScript.
- Modularized store and GraphQL logic for maintainability.
- Unified validation strategy with Zod.
- Error-safe, predictable checkout experience.
- Readable and consistent code style enforced by linting tools.
- Improved test coverage.

---

## Outcome

- State management is fully reactive and scalable.
- Validation and error handling ensure a robust user flow.
- Codebase is clean, consistent, and easy to extend.
- Added form usability and store test coverage to enhance confidence in stability.

---

## Future Enhancements

If given more time, I would:

- Add unit tests for all screens and GraphQL hooks.
- Improve UI responsiveness and animations.
- Implement persistent storage for cart data using MMKV.
- Integrate CI/CD workflow for automated lint and test checks.

---

**Author:** [Ahsan Tariq](https://github.com/AhsanT4riq)  
**Date:** October 2025
