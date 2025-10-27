import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import apolloClient from './src/graphql/client';
import AppNavigator from './src/navigation/AppNavigator';
import { StoreProvider } from './src/store/rootStore';
import { theme } from './src/theme';

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
