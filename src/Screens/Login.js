import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


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

        {/*E-mail Input*/}
        <View style={styles.form}>
          <Text style={styles.emailTitleText}>E-mail</Text>

          <View style={styles.input}>
            <TextInput 
            placeholder='Digite seu e-mail'
            placeholderTextColor={COLORS.grey}
            keyboardType='email-address'
            style={{width: "100%"}}
            ></TextInput>
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.form}>
          <Text style={styles.emailTitleText}>Senha</Text>

          <View style={styles.input}>
            <TextInput 
            placeholder='Insira uma senha'
            placeholderTextColor={COLORS.grey}
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

        {/* Checkbox */}
        <View style={styles.checkbox}>
          <Checkbox 
          style={{marginRight: 8}}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? COLORS.secondary : undefined}
          />

          <Text>Lembrar de mim</Text>
        </View>

        {/* Button Component */}
        <Button
        title="Acessar"
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        />

        {/* Others register options */}
        {/* Lines */}
        <View style={styles.lines}>
          <View style={styles.line}/>
          <Text style={{fontSize: 14}}>Ou acessar com</Text>
          <View style={styles.line}/>
        </View>

        {/* Buttons */}
        {/* Facebook */}
        <View style={styles.rowButtons}>
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={styles.othersButton}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={styles.imagesButton}
              resizeMode='contain'
            />
            <Text>Facebook</Text>

          </TouchableOpacity>

          {/* Google */}
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={styles.othersButton}
          >
            <Image
              source={require("../assets/google.png")}
              style={styles.imagesButton}
              resizeMode='contain'
            />
            <Text>Google</Text>
          </TouchableOpacity>

        </View>

        {/* Dont't have an account yet? */}
        <View style={styles.footer}>
          <Text style={{fontSize: 16, color: COLORS.black}}>Ainda não possui uma conta?</Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.loginNavigate}> 
              Registre-se
            </Text>
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
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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
  lines: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical:  20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginHorizontal: 10
  },
  othersButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    marginRight: 4,
    borderRadius: 10
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "center"
  },
  imagesButton: {
    height: 36,
    width: 36,
    marginRight: 8
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 22
  },
  loginNavigate: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 6
  }
})