import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import RegisterPet from '../Screens/RegisterPet';
import PetScreen from '../Screens/PetScreen';
import QRCodeScreen from '../Screens/QRCodeSreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
  return(
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: true }}>
      <Stack.Screen
      name='Home'
      component={TabNavigator}
      options={{
        headerShown: false,
        headerShadowVisible: true,
        title: '',
      }}
      />

      <Stack.Screen
      name='RegisterPet'
      component={RegisterPet}
      options={{
        headerShadowVisible: false,
        title: 'Registrar Pet'
      }}
      />

      <Stack.Screen
      name='PetScreen'
      component={PetScreen}
      options={{
        headerShadowVisible: false,
        title: 'Editar Pet'
      }}
      />

      <Stack.Screen
      name='QRCodeScreen'
      component={QRCodeScreen}
      options={{
        headerShadowVisible: false,
        title: 'QRCode'
      }}
      />
    </Stack.Navigator>
  )
}