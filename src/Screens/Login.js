import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';

export default function SignUp({navigation}){
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header2}>
          <Text style={styles.title}>Olá, Bem-vindo de volta 👋</Text>
          <Text style={styles.text}>Sentimos sua falta!</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.emailTitleText}>E-mail</Text>

          <View style={styles.input}>
            <TextInput 
            placeholder='Digite seu e-mail'
            placeholderTextColor='#a1a1a1'
            keyboardType='email-address'
            style={{width: "100%"}}
            ></TextInput>
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.emailTitleText}>Senha</Text>

          <View style={styles.input}>
            <TextInput 
            placeholder='Insira uma senha'
            placeholderTextColor='#a1a1a1'
            secureTextEntry={isPasswordShown}
            style={{width: "100%"}}
            ></TextInput>

            <TouchableOpacity 
            style={styles.viewPwd}
            onPress={() => setIsPasswordShown(!isPasswordShown)}
            >
              {
                isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black}/>
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black}/>
                )
              }
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.checkbox}>
          <Checkbox 
          style={{marginRight: 8}}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? COLORS.secondary : undefined}
          />

          <Text>Lembrar de mim</Text>
        </View>

        <Button
        title="Cadastrar"
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical:  20
          }}
        >
          <View 
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
          <Text style={{fontSize: 14}}>Ou cadastre-se com</Text>
          <View 
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
        </View>

        <View style={{
            flexDirection: "row",
            justifyContent: "center"
        }}>
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />

            <Text>Facebook</Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Image
              source={require("../assets/google.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />

            <Text>Google</Text>

          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 22
        }}>
          <Text style={{fontSize: 16, color: COLORS.black}}>Ainda não possui uma conta?</Text>
          <Pressable
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: "bold",
              marginLeft: 6
            }}> 
            Registre-se</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 1,
    marginHorizontal: 22,
  },
  header2: {
    marginVertical: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
  },
  form: {
    marginBottom: 12,
  },
  emailTitleText: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  inputNumber: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 22,
  },
  viewPwd: {
    position: "absolute",
    right: 12,
  },
  checkbox: {
    flexDirection: "row",
    marginVertical: 6,
  },
})