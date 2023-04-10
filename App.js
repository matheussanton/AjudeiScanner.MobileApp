import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './src/routes/app.routes'

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthProvider> */}
      {/* <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false} /> */}
      <AppRoutes />
      {/* </AuthProvider> */}
    </NavigationContainer>
  );
}
