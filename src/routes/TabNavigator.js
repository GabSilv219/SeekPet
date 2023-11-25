import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import COLORS from '../constants/colors';
import { Entypo } from '@expo/vector-icons';

import Home from '../Screens/Home';
import Notifications from '../Screens/Notifications';
import Pets from '../Screens/Pets';
import Post from '../Screens/Post';
import Profile from '../Screens/Profile';

import ButtonNew from '../components/ButtonNew';

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
  return(
    <Tab.Navigator 
      initialRouteName='Home' 
      screenOptions={{ 
        tabBarStyle: {
          borderTopColor: 'transparent',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarInactiveTintColor: COLORS.grey,
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
      name='SeekPet'
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Entypo name="home" color={color} size={size}/>,
        tabBarLabel: 'Feed'
      }}
      />

      <Tab.Screen
      name='Pet'
      component={Pets}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Entypo name="baidu" color={color} size={size}/>,
        tabBarLabel: 'Pets'
      }}
      />

      <Tab.Screen
      name='Post'
      component={Post}
      options={{
        tabBarStyle: {
          display: 'none'
        },
        headerShown: false,
        tabBarLabel: '',
        tabBarIcon: ({ size, focused }) => <ButtonNew size={size} focused={focused} />,
      }}
      />

      <Tab.Screen
      name='Notifications'
      component={Notifications}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Entypo name="bell" color={color} size={size}/>,
        tabBarLabel: 'Notificações'
      }}
      />

      <Tab.Screen
      name='Profile'
      component={Profile}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Entypo name="user" color={color} size={size}/>,
        tabBarLabel: 'Perfil'
      }}
      />
    </Tab.Navigator>
  )
}