import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Configure the GraphQL endpoint
// For iOS simulator: use localhost
// For Android emulator: use 10.0.2.2
// For physical device: use your computer's IP address
const getGraphQLEndpoint = () => {
    const baseUrl = 'http://localhost:4000/graphql';
    // You can also use: 'http://10.0.2.2:4000/graphql' for Android emulator
    return baseUrl;
};

// Create Apollo Client
const client = new ApolloClient({
    link: new HttpLink({
        uri: getGraphQLEndpoint(),
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

export default client;
