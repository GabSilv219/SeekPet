import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';

// Validations
const schema = yup.object({
  username: yup.string()
    .required("É necessário informar seu nome*")
    .trim()
    .min(3, "É necessário informar seu nome*"),
  email: yup.string()
    .required("É necessário informar um e-mail*")
    .email("É necessário informar um e-mail válido*"),
  cpf: yup.string()
    .required("É necessário informar um CPF*")
    .max(14, "Informe um CPF válido*"),
  number: yup.string()
    .required("É necessário informar um número de telefone*")
    .max(15, "Informe um número de telefone válido*"),
  password: yup.string()
    .required("É necessário informar uma senha de acesso*")
    .trim()
    .matches(/^\S+$/, 'Informe uma senha válida*')
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*"),
  confirm_password: yup.string()
    .required("É necessário repetir a senha*")
    .trim()
    .matches(/^\S+$/, 'Informe uma senha válida*')
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*")
    .oneOf([yup.ref("password")],"As senhas devem ser iguais*").required("Confirme sua senha*"),
  checkbox: yup.bool()
    .oneOf([true], "Você deve aceitar os termos para prosseguir*"),
}) 

export default function SignUp({navigation}){
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  //Send data form and navigate to Login Page
  const access = () => navigation.navigate("Login");
  function handleSignIn(data){
    console.log(data);
    access();
  }  

  //Show or hide password digits
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  return(
    <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header2}>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.text}>Registre seu pet hoje! 🐕</Text>
          </View>

          {/* Form */}
          {/* Name Input */}
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Nome</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.username ? COLORS.error : COLORS.grey 
                }]}
            >
              <Controller
                control={control} 
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput 
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Digite seu nome'  
                    placeholderTextColor={COLORS.grey}
                    keyboardType='email-address'
                    style={{width: "100%"}}
                    maxLength={80}
                  />
                )}
              />
            </View>
          {errors.username && <Text style={styles.labelError}>{errors.username?.message}</Text>}
          </View>

          {/*E-mail Input*/}
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>E-mail</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.email ? COLORS.error : COLORS.grey
                }]}
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

          {/*CPF Input*/}
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>CPF</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.email ? COLORS.error : COLORS.grey
                }]}
            >
              <Controller
                control={control}
                name="cpf"
                rules={{ required: true, maxLength: 14}}
                render={({ field: { onChange, onBlur, value }}) => (
                  <TextInputMask
                    type={"cpf"} 
                    onChangeText={onChange} 
                    onBlur={onBlur}
                    value={value}
                    placeholder='Digite seu CPF'
                    placeholderTextColor={COLORS.grey}
                    keyboardType='numeric'
                    style={{width: "100%"}}
                    maxLength={14}
                  />   
                )}
              />
            </View>
            {errors.cpf && <Text style={styles.labelError}>{errors.cpf?.message}</Text>}
          </View>

          {/* Number Input */}
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Número de telefone</Text>
            
            <View 
              style={[
                styles.inputNumber, {
                  borderColor: errors.number ? COLORS.error : COLORS.grey
                }]}
            >
              <Controller
                control={control}
                name='number'
                rules={{ required: true, maxLength: 15}}
                render={({ field: { onChange, onBlur, value }}) => (
                  <TextInputMask
                  type={"cel-phone"}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                    placeholder="Informe seu número de telefone"
                    placeholderTextColor={COLORS.grey}
                    keyboardType='numeric'
                    style={{width: "80%"}}
                    maxLength={15}
                  />
                )}
              />
            </View>
            {errors.number && <Text style={styles.labelError}>{errors.number.message}</Text>}
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
          </View>

          {/* Confirm Password */}
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Confirmação de senha</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.confirm_password ? COLORS.error : COLORS.grey
                }]}
            >
              <Controller
                control={control}
                name='confirm_password'
                render={({ field: { onChange, onBlur, value }}) => (
                  <TextInput 
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='Repita a senha'
                    placeholderTextColor={COLORS.grey}
                    secureTextEntry={isPasswordShown}
                    style={{width: "100%"}}
                  />
                )}
              />

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
            {errors.confirm_password && <Text style={styles.labelError}>{errors.confirm_password.message}</Text>}
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
                  <Text>Eu li e concordo com os termos e condições.</Text>
                </View>
              )}
            />
            {errors.checkbox && <Text style={styles.labelError}>{errors.checkbox.message}</Text>}
          </View>
          {/* Button Component*/}
          <Button
          onPress={handleSubmit(handleSignIn)}
          title="Cadastrar"
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
            <Text style={{fontSize: 14}}>Ou cadastre-se com</Text>
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
            <Text style={{fontSize: 16, color: COLORS.black}}>Já possui uma conta?</Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginNavigate}> 
                Faça Login
              </Text>
            </Pressable>
          </View>

        </View>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, 
    marginTop: -20,
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
  inputNumber: {
    width: '100%',
    height: 48,
    borderColor: COLORS.grey,
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
    marginTop: 8,
  }
})