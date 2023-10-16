import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import TabRoutes from './tab.routes';
const Drawer = createDrawerNavigator();

export default function DrawerRoutes(){
  return(
    <Drawer.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Drawer.Screen
      name='home' 
      component={TabRoutes}
      options={{
        headerShown: true,
        title: '',
        drawerIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
        drawerLabel: `Início`
      }}
      />
    </Drawer.Navigator>
  )
}