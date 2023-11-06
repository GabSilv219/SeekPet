import { View, Text, StyleSheet, Image, FlatList,TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import COLORS from '../constants/colors';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from '../contexts/auth';
import Dialog from '../components/Dialog';

export default function Profile({navigation}) {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const {userInfo} = useContext(AuthContext);

  const {logout} = useContext(AuthContext);

  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get('https://api-seekpet-prisma.onrender.com');
  //     const userData = response.data;
  //     setUser(userData);
  //     console.log(userData);
  //   } catch (error) {
  //     console.error('Erro ao buscar dados do usuário:', error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchUser();
  // }, []);
  
  return (
    <View style={styles.container}>
      <View style={{marginTop: 64, alignItems: "center"}}>

        <View style={styles.avatarContainer}>
            <Image source={{uri: `https://api-seekpet-prisma.onrender.com/users/${userInfo.avatar}`}} style={styles.avatar}/>
        </View>
            <Text style={styles.name}>{userInfo.nome}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statAMount}>0</Text>
          <Text style={styles.statTitle}>Posts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAMount}>0</Text>
          <Text style={styles.statTitle}>Seguidores</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statAMount}>0</Text>
          <Text style={styles.statTitle}>Seguindo</Text>
        </View>
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
        message={'Deseja mesmo sair da sua conta?'}
        cancelButton={true}
        positiveButton={() => {setVisible(false); logout()}}
        negativeButton={() => setVisible(false)}
      />
      <TouchableOpacity onPress={() => setVisible(true)} 
        style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}
      >
        <Text style={{color: COLORS.secondary, fontSize: 24 }}>Sair</Text>
        <Entypo name='log-out' size={20} color={COLORS.secondary} style={{marginLeft: 10}}/>
      </TouchableOpacity>

        {/* <FlatList  
          data={user}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.avatarContainer}>
              <Image source={{uri: `https://api-seekpet-prisma.onrender.com/users/${item.avatar}`}} style={styles.avatar}/>
              <Text style={styles.name}>{item.nome}</Text>
            </View>
          )}
        /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECF4',
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 30,
    shadowOpacity: 0.4
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 2,
    borderColor: COLORS.primary
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600"
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32
  },
  stat: {
    alignItems: "center",
    flex: 1
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300"
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4
  }
})