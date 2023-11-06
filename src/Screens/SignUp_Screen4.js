import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Validations
const schema = yup.object({
  senha: yup.string()
    .required("É necessário informar uma senha de acesso*")
    .trim()
    .matches(/^\S+$/, 'Informe uma senha válida*')
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*"),
  confirmarSenha: yup.string()
    .required("É necessário repetir a senha*")
    .trim()
    .matches(/^\S+$/, 'Informe uma senha válida*')
    .min(6, "A senha deve ter pelo menos 6 digítos*")
    .max(30, "A senha deve ter no máximo 12 digítos*")
    .oneOf([yup.ref("senha")],"As senhas devem ser iguais*").required("Confirme sua senha*"),
  checkbox: yup.bool()
    .oneOf([true], "Você deve aceitar os termos para prosseguir*"),
}) 

export default function SignUp({navigation, route}){
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  //Show or hide password digits
  const [isFocused, setIsFocused] = useState(null);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const { avatar, nome, email, data_nasc, cpf, tel, cep, bairro, rua, numero, 
  complemento, cidade, estado } = route.params;
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPost = async () => {
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('data_nasc', data_nasc);
      formData.append('cpf', cpf);
      formData.append('tel', tel);
      formData.append('cep', cep);
      formData.append('bairro', bairro);
      formData.append('rua', rua);
      formData.append('numero', numero);
      formData.append('complemento', complemento);
      formData.append('cidade', cidade);
      formData.append('estado', estado);
      formData.append('senha', senha);
      formData.append('confirmarSenha', confirmarSenha);
      
      formData.append('avatar', {
        uri: avatar,
        type: 'image/jpeg',
        name: 'avatar.jpg'
      });
  
      const response = await axios.post('https://api-seekpet-prisma.onrender.com/signUp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Resposta da API:', response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.error('Erro ao enviar o post para a API:', error);
    }
  };

  function sendData(){
    sendPost();
  }  

  const handleFocus = (inputName) => {
    setIsFocused(inputName);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  return(
    <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header2}>
            <Text style={styles.title}>Definição de senha</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Senha</Text>

            <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'senha' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'senha' ? 1 : null,
                    backgroundColor: isFocused === 'senha' ? COLORS.white : '#efeff1',
                  }]}
            >
              <Controller
                control={control}
                name='senha'
                render={({ field: { onChange }}) => (
                  <TextInput
                    onChangeText={(text) => {setSenha(text); onChange(text)}}
                    value={senha}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('senha')}
                    placeholder='Insira uma senha'
                    placeholderTextColor={COLORS.grey}
                    secureTextEntry={isPasswordShown}
                    style={{width: "100%"}}
                    maxLength={30}
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
            {errors.senha && <Text style={styles.labelError}>{errors.senha.message}</Text>}
          </View>

     
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>Confirmação de senha</Text>

            <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'confirmarSenha' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'confirmarSenha' ? 1 : null,
                    backgroundColor: isFocused === 'confirmarSenha' ? COLORS.white : '#efeff1',
                  }]}
            >
              <Controller
                control={control}
                name='confirmarSenha'
                render={({ field: { onChange }}) => (
                  <TextInput
                    onChangeText={(text) => {setConfirmarSenha(text); onChange(text)}}
                    value={confirmarSenha}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('confirmarSenha')}
                    placeholder='Repita a senha'
                    placeholderTextColor={COLORS.grey}
                    secureTextEntry={isPasswordShown}
                    style={{width: "100%"}}
                    maxLength={30}
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
            {errors.confirmarSenha && <Text style={styles.labelError}>{errors.confirmarSenha.message}</Text>}
          </View>

     
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
       
          <Button
              onPress={handleSubmit (() => {
                setLoading(true);
                sendData();
              })}
              filled
              title={
                loading ? (
                  <ActivityIndicator size={20} color={COLORS.white} style={{paddingTop: 5}}/>
                ) : (
                  "Cadastrar"
                )}
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              disabled={loading}
            >
            </Button>

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
    paddingBottom: 240
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
  new: {
    backgroundColor: '#efeff1',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30
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