import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterPet from '../Screens/RegisterPet';
import PetScreen from '../Screens/PetScreen';
import QRCodeScreen from '../Screens/QRCodeSreen';
import Settings from '../Screens/Settings';
import EditProfile from '../Screens/EditProfile';

import DrawerRoutes from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function AppStack(){
  return(
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: true }}>
      <Stack.Screen
      name='Home'
      component={DrawerRoutes}
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

      <Stack.Screen
      name='Settings'
      component={Settings}
      options={{
        headerShadowVisible: false,
        title: 'Configurações'
      }}
      />

      <Stack.Screen
      name='EditProfile'
      component={EditProfile}
      options={{
        headerShadowVisible: false,
        title: 'Editar Perfil'
      }}
      />
    </Stack.Navigator>
  )
}