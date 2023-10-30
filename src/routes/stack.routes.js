import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './tab.routes';

import Welcome from '../Screens/Welcome';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import RegisterPet from '../Screens/RegisterPet';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
  return(
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: true }}>
      <Stack.Screen
      name='Welcome'
      component={Welcome}
      options={{
        headerShown: false,
      }}
      />

      <Stack.Screen
      name='Login'
      component={Login}
      options={{
        headerShadowVisible: false,
        title: ''
      }}
      />

      <Stack.Screen
      name='SignUp'
      component={SignUp}
      options={{
        headerShadowVisible: false,
        title: ''
      }}
      />

      <Stack.Screen
      name='Home'
      component={TabRoutes}
      options={{
        headerShown: false,
        headerShadowVisible: false,
        title: ''
      }}
      />

      <Stack.Screen
      name='RegisterPet'
      component={RegisterPet}
      options={{
        headerShadowVisible: false,
        title: ''
      }}
      />
    </Stack.Navigator>
  )
}