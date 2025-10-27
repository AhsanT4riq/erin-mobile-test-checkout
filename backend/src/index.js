const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('@apollo/server/plugin/landingPage/default');
const cors = require('cors');
const bodyParser = require('body-parser');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { initializeDefaultCart } = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 4000;

async function startServer() {
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    formatError: error => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
      };
    },
  });

  await server.start();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // GraphQL endpoint
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({
        // Add any context here (e.g., authentication)
        headers: req.headers,
      }),
    }),
  );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Initialize default cart for testing
  app.get('/init-cart', (req, res) => {
    const cart = initializeDefaultCart();
    res.json({
      message: 'Default cart initialized',
      cartId: cart.id,
      cart,
    });
  });

  // Documentation endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Mobile Checkout GraphQL API',
      version: '1.0.0',
      endpoints: {
        graphql: '/graphql',
        health: '/health',
        initCart: '/init-cart',
      },
      testCards: {
        success: '4242424242424242',
        declined: '4000000000000002',
        insufficientFunds: '4000000000009995',
        expired: '4000000000000069',
      },
      documentation: {
        note: 'Use GraphQL Playground or any GraphQL client to explore the schema',
        exampleFlow: [
          '1. Create a user with createUser mutation',
          '2. Create an address with createAddress mutation',
          '3. Create a cart with createCart mutation',
          '4. Add items to cart with addToCart mutation',
          '5. Process payment with processPayment mutation',
        ],
      },
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`💳 Test Cards:`);
    console.log(`   ✅ Success: 4242424242424242`);
    console.log(`   ❌ Declined: 4000000000000002`);
    console.log(`   💰 Insufficient Funds: 4000000000009995`);
    console.log(`   📅 Expired: 4000000000000069`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
