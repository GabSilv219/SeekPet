import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../Screens/Welcome';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';

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
        headerTitleStyle: {
          color: "#fff",
        }
      }}
      />

      <Stack.Screen
      name='SignUp'
      component={SignUp}
      options={{
        headerShadowVisible: false,
        headerTitleStyle: {
          color: "#fff",
        }
      }}
      />

      <Stack.Screen
      name='Home'
      component={Home}
      options={{
        headerShadowVisible: false,
        headerTitleStyle: {
          color: "#fff",
        }
      }}
      />
    </Stack.Navigator>
  )
}