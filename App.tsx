import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme';
import apolloClient from './src/graphql/client';
import { StoreProvider } from './src/store/rootStore';

const App = () => {
  return (
    <StoreProvider>
      <ApolloProvider client={apolloClient}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </StoreProvider>
  );
};

export default App;
