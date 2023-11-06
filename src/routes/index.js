import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { AuthContext } from '../contexts/auth';

export default function Routes(){
  const {isLoading, userToken} = useContext(AuthContext);

  if (isLoading) {
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  }
  return(
    <NavigationContainer>
      {userToken !== null ? <AppStack/> : <AuthStack/>}
      <StatusBar  style="auto"/>
    </NavigationContainer>
  )
}