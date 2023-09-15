import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../Screens/Welcome';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
  return(
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
      <Stack.Screen
      name='Welcome'
      component={Welcome}
      />

      <Stack.Screen
      name='Login'
      component={Login}
      />

      <Stack.Screen
      name='SignUp'
      component={SignUp}
      />
    </Stack.Navigator>
  )
}