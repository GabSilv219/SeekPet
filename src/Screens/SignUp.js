import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
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
    .required("É necessário informar seu nome*"),
  email: yup.string()
    .email("É necessário informar um e-mail válido*").required("É necessário informar um e-mail*"),
  cpf: yup.number().required("É necessário informar um CPF*"),
  number: yup.number()
    .min(8, "Informe um número de telefone válido*")
    .max(12, "Informe um número de telefone válido*")
    .required("É necessário informar um número de telefone*"),
  password: yup.string()
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*")
    .required("É necessário informar uma senha de acesso*"),
  confirm_password: yup.string()
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*")
    .oneOf([yup.ref("password")],"As senhas devem ser iguais*").required("Confirme sua senha*"),
}) 

export default function SignUp({navigation}){
  const { control, watch, setValue, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  function handleSignIn(data){
    console.log(data);
  }

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cell, setCell] = useState('');
  const [cpf, setCpf] = useState('');
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
                render={({ field: { onChange, onBlur, value }}) => (
                  <TextInputMask
                    type={"cpf"} 
                    onChange={onChange}
                    onChangeText={ text => setCpf(text) }
                    onBlur={onBlur}
                    value={cpf}
                    placeholder='Digite seu CPF'
                    placeholderTextColor={COLORS.grey}
                    keyboardType='numeric'
                    style={{width: "100%"}}
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
                name="ddi"
                render={({ field: { onChange, onBlur, value }}) => (
                  <TextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder='+55'
                    placeholderTextColor={COLORS.grey}
                    keyboardType='numeric'
                    style={styles.ddiText}
                  />
                )}
              />
              <Controller
                control={control}
                name='number'
                render={({ field: { onChange, onBlur, value }}) => (
                  <TextInputMask
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) "
                  }}
                  onChangeText={ text => setCell(text) }
                  onBlur={onBlur}
                  value={cell}
                    placeholder="Informe seu número de telefone"
                    placeholderTextColor={COLORS.grey}
                    keyboardType='numeric'
                    style={{width: "80%"}}
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
          <View style={styles.checkbox}>
            <Checkbox 
            style={{marginRight: 8}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.secondary : undefined}
            />

            <Text>Eu li e concordo com os termos e condições.</Text>
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
  ddiText: {
    width: "12%",
    borderRightWidth: 1,
    borderLeftColor: COLORS.grey,
    height: '100%'
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
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
    color: COLORS.error,
    marginTop: 8,
  }
})