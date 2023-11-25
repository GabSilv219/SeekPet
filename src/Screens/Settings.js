import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';
import Dialog from '../components/Dialog';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../contexts/auth';
import axios from 'axios';

export default function Settings({navigation}){

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {userInfo} = useContext(AuthContext);
  const {logout} = useContext(AuthContext);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`https://api-seekpet-prisma.onrender.com/delete-user/${userInfo.id}`);
      console.log('Resposta da API:', response.data);
      logout();

    } catch (error) {
      console.error('Erro ao deletar conta do usuário', error);
    }
  }

  function deleteUserData() {
    setLoading(true) 
    deleteUser()
      .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: 20, borderBottomWidth: 2, borderBottomColor: COLORS.lightGrey}}>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text style={{fontSize: 20, marginLeft: 20, marginBottom: 20}}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      <Dialog
        visible={visibleDelete}
        title={
          loading ? (
            <ActivityIndicator size={20} color={COLORS.white} style={{paddingTop: 5}}/>
          ) : (
            "Atenção"
          )
        }
        text="Confirmar"
        message={'Tem certeza que quer deletar sua conta?'}
        cancelButton={true}
        positiveButton={() => {setLoading(true); setVisibleDelete(false); deleteUserData()}}
        negativeButton={() => setVisibleDelete(false)}
      />
      <View style={{marginTop: 20, borderBottomWidth: 1, borderBottomColor: COLORS.lightGrey}}>
        <TouchableOpacity onPress={() => setVisibleDelete(true)}>
          <Text style={{fontSize: 20, marginLeft: 20, marginBottom: 20}}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>
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
        positiveButton={() => {setVisible(false); logout()}}
        negativeButton={() => setVisible(false)}
      />
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => setVisible(true)} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name='log-out' size={22} color={COLORS.error}/>
            <Text style={{fontSize: 20, marginLeft: 15, color: COLORS.error}}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%'
  }
})
