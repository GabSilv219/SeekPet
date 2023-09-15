import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from "@react-navigation/native";

export default function Welcome(){
  const Line = () => <View style={styles.line} />;
  const Separator = () => <View style={styles.separator} />;


  const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Animatable.Image
        delay={300}
        animation='fadeIn' 
        source={require('../assets/dogFoot.jpg')}
        style={styles.img}
        resizeMode="cover"
        />
      </View>

      <Animatable.View delay={400} animation="fadeInUp" style={styles.containerForm}>
        <Line/>
        <Text style={styles.welcome}>Bem-vindo ao SeekPet!</Text>
        <Text style={styles.title}>Dê ao seu pet mais do que um nome, dê sua própria 
          <Text style={styles.id}> Identidade!</Text>
        </Text>
        <Text style={styles.text}>Faça login para começar ou cadastre-se</Text>

        <TouchableOpacity onPress={ () => navigation.navigate('SignIn')} style={styles.buttonSignIn}>
          <Text style={styles.buttonSignInText}>Acessar</Text>
        </TouchableOpacity>

        <Separator/>
        <Text style={styles.ou}>ou</Text>

        <TouchableOpacity onPress={ () => navigation.navigate('SignUp')} style={styles.buttonSignUp}>
          <Text style={styles.buttonSignUpText}>Cadastrar-se</Text>
        </TouchableOpacity>

      </Animatable.View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8D532', 
  },
  containerImage: {
    flex: 1,
    backgroundColor: '#E8D532',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: '100%',
    height: '110%',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  line: {
    marginVertical: 15,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomColor: '#a1a1a1',
    borderBottomWidth: 1,
  },
  welcome: {
    color: '#737373',
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#737373',
    marginTop: 10,
    marginBottom: 30,
  },
  id: {
    color: '#E8D532',
  },
  text: {
    color: '#a1a1a1',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonSignIn: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E8D532',
    borderRadius: 50,
    paddingVertical: 8,
    width: '50%',
    alignSelf: 'center',
    bottom: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSignInText: {
    fontSize: 18,
    color: '#E8D532',
    fontWeight: 'bold',
  },
  buttonSignUp: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#1a73e8',
    borderRadius: 50,
    paddingVertical: 8,
    width: '50%',
    alignSelf: 'center',
    bottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSignUpText: {
    fontSize: 18,
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 105,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomColor: '#a1a1a1',
    borderBottomWidth: 1,
  },
  ou: {
    marginVertical: -115,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 12,
    color: '#a1a1a1',
  }
})