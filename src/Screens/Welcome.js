import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import COLORS from "../constants/colors";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import * as Animatable from 'react-native-animatable';

import { useNavigation } from "@react-navigation/native";

export default function Welcome(){
  const navigation = useNavigation();
  
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 40,
            color: '#E8D532',
            marginBottom: 40,
          }}>
          SeekPet
        </Text>
        
        <Image style={styles.img} source={require('../assets/owner-idcard-2.png')}></Image>
        <View style={styles.phrase}>
          <Text style={styles.welcome}>Bem-vindo ao SeekPet!</Text>
          <Text style={styles.title}>Dê ao seu Pet mais do que um nome, dê sua própria <Text style={styles.id}>Identidade!</Text></Text>
        </View>

      </View>


      <TouchableOpacity
        style={{
          backgroundColor: '#E8D532',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            
          }}>
          Começar
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color={COLORS.black} />
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={{fontSize: 14, color: COLORS.black}}>Ainda não possui uma conta?</Text>
        <Pressable onPress={() => navigation.navigate("SignUp_Screen1")}>
          <Text style={styles.loginNavigate}> 
            Registre-se
          </Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 360,
    height: 270,
  },
  phrase: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    alignSelf: 'flex-start',
    fontSize: 15,
    color: COLORS.darkGrey,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkGrey, 
    marginTop: 10,
  },
  id: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30
  },
  loginNavigate: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 6
  }
});