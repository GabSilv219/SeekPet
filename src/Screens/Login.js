import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validations
const schema = yup.object({
  email: yup.string()
    .required("É necessário informar um e-mail*")
    .email("É necessário informar um e-mail válido*"),
  password: yup.string()
    .required("É necessário informar uma senha de acesso*")
    .trim()
    .matches(/^\S+$/, 'Informe uma senha válida*')
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*"),
}) 

export default function SignUp({navigation}){
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  //Send data form and navigate to Login Page
  const access = () => navigation.navigate("Home");
  function handleSignIn(data){
    console.log(data);
    access();
  }  

  //Show or hide password digits
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  
  return(
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header2}>
          <Text style={styles.title}>Olá, Bem-vindo de volta 👋</Text>
          <Text style={styles.text}>Sentimos sua falta!</Text>
        </View>

        {/* Form */}
        {/*E-mail Input*/}
        <View style={styles.form}>
          <Text style={styles.emailTitleText}>E-mail</Text>

          <View 
            style={[
              styles.input, {
                borderColor: errors.email ? COLORS.error : COLORS.grey
              }
            ]}
          >
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput 
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder='Digite seu e-mail'
                  placeholderTextColor={COLORS.grey}
                  keyboardType='email-address'
                  style={{width: "100%"}}
                />  
              )}
            />
          </View>
          {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}
        </View>

          {/* Password Input */}
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Senha</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.confirm_password ? COLORS.error : COLORS.grey
                }]}
            >
              <Controller
                control={control}
                name='password'
                render={({ field: { onChange, onBlur, value }}) => (
                  <TextInput 
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Insira uma senha'
                    placeholderTextColor={COLORS.grey}
                    secureTextEntry={isPasswordShown}
                    style={{width: "100%"}}
                  />
                )}
              />

              {/* Shown Password Function button */}
              <TouchableOpacity 
                style={styles.viewPwd}
                onPress={() => setIsPasswordShown(!isPasswordShown)}
              >
                {
                  isPasswordShown == true ? (
                    <Ionicons name="eye-off" size={24} color={COLORS.grey}/>
                  ) : (
                    <Ionicons name="eye" size={24} color={COLORS.grey}/>
                  )
                }
              </TouchableOpacity>

            </View>
            {errors.password && <Text style={styles.labelError}>{errors.password.message}</Text>}
            {/* Forgot Password */}
            <TouchableOpacity>
              <Text 
                style={[
                  styles.forgotPWDText, {
                    marginTop: errors.password ? -14 : 8
                  }
                ]}
              >
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Checkbox */}
          <View>
            <Controller
              control={control}
              name='checkbox'
              rules={{ required: true }}
              render={({ field }) => (
                <View  style={styles.checkbox}>
                  <Checkbox
                    style={{marginRight: 8}}
                    value={field.value}
                    onValueChange={field.onChange}
                    color={COLORS.secondary}
                  />
                  <Text>Lembrar de mim.</Text>
                </View>
              )}
            />
          </View>


          {/* Button Component*/}
          <Button
            onPress={handleSubmit(handleSignIn)}
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

          {/* Already have an account? */}
          <View style={styles.footer}>
            <Text style={{fontSize: 16, color: COLORS.black}}>Ainda não possui uma conta?</Text>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.loginNavigate}> 
                Registre-se
              </Text>
            </Pressable>
          </View>

        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", 
    marginTop: -10,
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
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
  },
  viewPwd: {
    position: "absolute",
    right: 12,
  },
  forgotPWDText: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    fontSize: 12,
    color: COLORS.secondary,
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
  },
  labelError: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
    color: COLORS.error,
    marginTop: 8
  }
})