import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';

export default function Routes(){
  return(
    <NavigationContainer>
      <StatusBar backgroundColor='#E8D532' barStyle="light-content" />
      <StackRoutes/>
    </NavigationContainer>
  )
}