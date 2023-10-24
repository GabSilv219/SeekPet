import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import StackRoutes from './stack.routes';

export default function Routes(){
  return(
    <NavigationContainer > 
      <StackRoutes></StackRoutes>
      <StatusBar  style="auto"/>
    </NavigationContainer>
  )
}