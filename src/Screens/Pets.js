import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import { Feather } from '@expo/vector-icons';

export default function Pet() {
  return (
      <View style={styles.container}>
        <Text style={styles.Title}>Meus Pets</Text>
        <View style={styles.ids}>
          <TouchableOpacity style={styles.new}>
            <Feather name="plus" size={70} color={COLORS.primary} style={{marginBottom: 15}}/>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Adicionar Pet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.new}>
            <Image style={styles.photo} source={require('../assets/dog1.jpg')}></Image>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Mika</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ids}>
          <TouchableOpacity style={styles.new}>
            <Image style={styles.photo} source={require('../assets/dog2.jpg')}></Image>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Jack</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.new}>
            <Image style={styles.photo} source={require('../assets/cat1.jpg')}></Image>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Oracious</Text>
          </TouchableOpacity>
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  Title: {
    fontSize:45,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 120,
    marginBottom: 20
  },
  img: {
    width: 500,
    height: 200,
  },
  ids: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  new: {
    backgroundColor: COLORS.white,
    width: 165,
    height: 180,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  photo: {
    width: 60, 
    height: 60, 
    borderRadius: 80,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.grey
  },
})