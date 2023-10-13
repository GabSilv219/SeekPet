import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';

export default function Routes(){
  return(
    <NavigationContainer> 
      <StackRoutes/>
    </NavigationContainer>
  )
}