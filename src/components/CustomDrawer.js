import React, {useContext, useState} from  'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import COLORS from '../constants/colors';
import { Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog from '../components/Dialog';
import { AuthContext } from '../contexts/auth';

export default function CustomDrawer(props){
  const {userInfo} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {logout} = useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView 
        {...props}
        contentContainerStyle={{backgroundColor: COLORS.primary}}
      >
        <ImageBackground
          source={require("../assets/yellowBackground.jpg")}
          style={{padding: 20}}
        >
          <Image 
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10, borderWidth: 2, borderColor: COLORS.white}}
            source={{uri: `https://api-seekpet-prisma.onrender.com/users/${userInfo.avatar}`}} 
          />
          <Text style={{color: COLORS.white, fontSize: 18}}>{userInfo.nome}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.white,
                marginRight: 5,
                marginTop: 5
              }}>
              Dono de Pet 
            </Text>
            <Ionicons name='paw' size={15} color={COLORS.white} style={{marginTop: 6}}/>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: COLORS.white, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Dialog
        visible={visible}
        title={
          loading ? (
            <ActivityIndicator size={20} color={COLORS.white} style={{paddingTop: 5}}/>
          ) : (
            "Sair"
          )
        }
        text="Confirmar"
        message={'Deseja mesmo sair da sua conta?'}
        cancelButton={true}
        positiveButton={() => {setVisible(false); setLoading(true); logout()}}
        negativeButton={() => setVisible(false)}
      />
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => setVisible(true)} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name='log-out' size={22} color={COLORS.error}/>
            <Text style={{fontSize: 15, marginLeft: 15, color: COLORS.error}}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}