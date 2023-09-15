import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Home from '../Screens/Home';
import SignIn from '../Screens/SignIn';

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
  return(
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
      name='Home'
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size}/>,
        tabBarLabel: 'Início'
      }}
      />
      <Tab.Screen
      name='SignIn'
      component={SignIn}
      options={{
        tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size}/>,
        tabBarLabel: 'Perfil'
      }}
      />
    </Tab.Navigator>
  )
}