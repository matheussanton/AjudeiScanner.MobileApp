import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './src/routes/app.routes'

import UserProvider from './src/contexts/user'
import CuponsProvider from './src/contexts/cupons'
import LoadingProvider from './src/contexts/loading'

import Toast from 'react-native-toast-message';


export default function App() {

  return (
    <>
      <NavigationContainer>
        <LoadingProvider>
          <UserProvider>
            <CuponsProvider>
              <AppRoutes />
              <Toast />
            </CuponsProvider>
          </UserProvider>
        </LoadingProvider>
      </NavigationContainer>
    </>
  );
}
