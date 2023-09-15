import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../Screens/Welcome';
import SignIn from '../Screens/SignIn';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
      name='Welcome'
      component={Welcome}
      />

      <Stack.Screen
      name='SignIn'
      component={SignIn}
      />
    </Stack.Navigator>
  )
}