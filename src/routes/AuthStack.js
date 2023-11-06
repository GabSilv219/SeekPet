import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../Screens/Welcome';
import Login from '../Screens/Login';
import SignUp_Screen1 from '../Screens/SignUp_Screen1';
import SignUp_Screen2 from '../Screens/SignUp_Screen2';
import SignUp_Screen3 from '../Screens/SignUp_Screen3';
import SignUp_Screen4 from '../Screens/SignUp_Screen4';

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
      name='SignUp_Screen1'
      component={SignUp_Screen1}
      options={{
        headerShadowVisible: false,
        title: 'Criar Conta'
      }}
      />

      <Stack.Screen
      name='SignUp_Screen2'
      component={SignUp_Screen2}
      options={{
        headerShadowVisible: false,
        title: 'Criar Conta'
      }}
      />

      <Stack.Screen
      name='SignUp_Screen3'
      component={SignUp_Screen3}
      options={{
        headerShadowVisible: false,
        title: 'Criar Conta'
      }}
      />

      <Stack.Screen
      name='SignUp_Screen4'
      component={SignUp_Screen4}
      options={{
        headerShadowVisible: false,
        title: 'Criar Conta'
      }}
      />
    </Stack.Navigator>
  )
}