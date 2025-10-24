# Erin Mobile Code Test

This repository contains a React Native application tested and working on Android. The app includes navigation and screens for a checkout and payment wizard. In the `backend` folder, you'll find a GraphQL server with user, payment, and checkout mutations.

> **Note:** Both the GraphQL server and screens were AI-generated, so you may encounter issues or missing functionality. Please fix them as you go.

## Getting Started

1. Clone this repository
2. Start the GraphQL server:
   ```bash
   cd backend
   npm run start
   ```
3. Start the React Native application:
   ```bash
   npm run start
   ```

## Requirements

1. **Architecture:** Restructure the app in a way that makes sense for scaling. Remember, we're building a large application with many reusable screens and flows.

2. **State Management:** You must use MobX in this application, but **do not use MobX-state-tree**. MobX computed values are very powerful—make sure to take advantage of them where appropriate.

3. **GraphQL Integration:** Connect the GraphQL client and feed the data to the appropriate screens.

4. **Checkout Implementation:** Implement a complete checkout process from start to finish. The backend server includes test cards for various scenarios. You must handle all credit card scenarios:
   - Success
   - Declined
   - Insufficient funds
   - Expired

5. **Additional Components:** Add any missing screens or models as needed.

## Checkout Process Notes

1. Create a cart at the beginning of the process, but **do not attach a user to it initially**.

2. Create a user and address **only when the user is ready to process payment**. This is a long process by design—it was created to assess how you handle chained API calls and potential errors that may occur during the process.

## General Notes

- You are free to use any additional libraries you think are appropriate
- Feel free to ask questions if anything is unclear

## Evaluation Criteria

Your submission will be evaluated on:

- **Code Quality:** Clean, readable, and well-structured code
- **Component Design:** Reusable and well-architected components
- **State Management:** Proper state handling and data flow
- **Styling:** Consistent and responsive UI
- **Error Handling:** Graceful handling of edge cases
- **Performance:** Efficient rendering and data processing
- **Documentation:** Clear comments and documentation
