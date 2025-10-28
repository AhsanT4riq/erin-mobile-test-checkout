import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import apolloClient from './src/graphql/client';
import AppNavigator from './src/navigation/AppNavigator';
import { StoreProvider } from './src/store/rootStore';
import { theme } from './src/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <ApolloProvider client={apolloClient}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <KeyboardProvider statusBarTranslucent>
                <AppNavigator />
              </KeyboardProvider>
            </NavigationContainer>
          </PaperProvider>
        </ApolloProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
