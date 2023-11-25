import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import COLORS from '../constants/colors';
import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import RegisterPet from '../Screens/RegisterPet';
import Post from '../Screens/Post';
import Settings from '../Screens/Settings';

import TabRoutes from './TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({navigation}){
  return(
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props} />} 
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: '#333',
        headerShown: true, 
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15
        }
      }}
    >
      <Drawer.Screen 
        name='Início' 
        component={TabRoutes}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name='home-outline' size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name='Registrar Pet' 
        component={RegisterPet}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name='paw-outline' size={22} color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={25}
              style={{ marginLeft: 20}}
              onPress={() => {navigation.goBack()}}
            />
          ),
        }}
      />
      <Drawer.Screen 
        name='Criar' 
        component={Post}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name='camera-outline' size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name='Configurações' 
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name='settings-outline' size={22} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  )
}