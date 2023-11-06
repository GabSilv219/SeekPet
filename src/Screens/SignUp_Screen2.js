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
  data_nasc: yup.string()
    .required("É necessário Informar a data de nascimento*")
    .max(10, "Infome uma data válida"),
  cpf: yup.string()
    .required("É necessário informar um CPF*")
    .max(14, "Informe um CPF válido*"),
  tel: yup.string()
    .required("É necessário informar um número de telefone*")
    .max(15, "Informe um número de telefone válido*"),
}) 

export default function SignUp({navigation, route}){
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  //Show or hide password digits
  const [isFocused, setIsFocused] = useState(null);
  const { avatar, nome, email } = route.params;
  const [data_nasc, setData_nasc] = useState('');
  const [tel, setTel] = useState('');
  const [cpf, setCpf] = useState('');

  const handleFocus = (inputName) => {
    setIsFocused(inputName);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const nextStep = () => {
    console.log(`nome: ${nome}, email: ${email}, avatar: ${avatar}, data_nasc: ${data_nasc}, tel: ${tel}`);
    navigation.navigate('SignUp_Screen3', { avatar, nome, email, data_nasc, cpf, tel });
  }

  function handleSignIn(){
    nextStep();
  }  

  return(
    <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header2}>
            <Text style={styles.title}>Contato 📱</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Data de Nascimento</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.username ? COLORS.error : isFocused === 'data_nasc' ? COLORS.primary : null,
                  borderWidth: errors.username ? 1 : isFocused === 'data_nasc' ? 1 : null,
                  backgroundColor: isFocused === 'data_nasc' ? COLORS.white : '#efeff1'
                }]}
            >
              <Controller
                control={control}
                name="data_nasc"
                rules={{ required: true, maxLength: 14}}
                render={({ field: { onChange }}) => (
                  <TextInputMask
                    type={"datetime"} 
                    onChangeText={(text) => {setData_nasc(text); onChange(text)}} 
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('data_nasc')}
                    value={data_nasc}
                    placeholder='dd/mm/aaaa'
                    placeholderTextColor={COLORS.grey}
                    keyboardType='numeric'
                    style={{width: "100%"}}
                    maxLength={10}
                  />   
                )}
              />
            </View>
            {errors.data_nasc && <Text style={styles.labelError}>{errors.data_nasc?.message}</Text>}
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>CPF</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.username ? COLORS.error : isFocused === 'cpf' ? COLORS.primary : null,
                  borderWidth: errors.username ? 1 : isFocused === 'cpf' ? 1 : null,
                  backgroundColor: isFocused === 'cpf' ? COLORS.white : '#efeff1'
                }]}
            >
              <Controller
                control={control}
                name="cpf"
                rules={{ required: true, maxLength: 14}}
                render={({ field: { onChange }}) => (
                  <TextInputMask
                    type={"cpf"} 
                    onChangeText={(text) => {setCpf(text); onChange(text)}} 
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('cpf')}
                    value={cpf}
                    placeholder='___.___.___-__'
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

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Telefone</Text>

            <View 
              style={[
                styles.input, {
                  borderColor: errors.username ? COLORS.error : isFocused === 'tel' ? COLORS.primary : null,
                  borderWidth: errors.username ? 1 : isFocused === 'tel' ? 1 : null,
                  backgroundColor: isFocused === 'tel' ? COLORS.white : '#efeff1'
                }]}
            >
              <Controller
                control={control}
                name="tel"
                rules={{ required: true, maxLength: 14}}
                render={({ field: { onChange }}) => (
                  <TextInputMask
                    type={"cel-phone"} 
                    onChangeText={(text) => {setTel(text); onChange(text)}} 
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('tel')}
                    value={tel}
                    placeholder='Insira seu telefone'
                    placeholderTextColor={COLORS.grey}
                    keyboardType='numeric'
                    style={{width: "100%"}}
                    maxLength={15}
                  />   
                )}
              />
            </View>
            {errors.tel && <Text style={styles.labelError}>{errors.tel?.message}</Text>}
          </View>
       
          <Button
          onPress={handleSubmit(handleSignIn)}
          title="Avançar"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          />

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
    backgroundColor: '#fafafa',
    paddingBottom: 165
  },
  header: {
    flex: 1,
    marginHorizontal: 22,
  },
  header2: {
    marginVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center',
    justifyContent: 'center',
    color: COLORS.darkGrey,
  },
  form: {
    marginBottom: 12,
    elevation: 10,
  },
  emailTitleText: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    borderRadius: 8,
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