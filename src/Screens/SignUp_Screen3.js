import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';

// Validations
const schema = yup.object({
  cep: yup.string()
    .required("É necessário informar um cep*")
    .max(9, "Informe um cep válido*"),
  bairro: yup.string()
    .required("É necessário informar o bairro*")
    .max(30, "É nessário informar um bairro válido*"),
  rua: yup.string()
    .required("É necessário informar o nome da rua*")
    .max(50, "É necessário informar um nome válido*"),
  numero: yup.string()
    .required("É necessário o número*")
    .max(5, "É necessário o número*"),
  complemento: yup.string()
    .max(30, "Limite máximo de caracteres atingido!*"),
  cidade: yup.string()
    .required("É necessário informar sua cidade*")
    .max(50, "É necessário informar um nome válido*"),
  estado: yup.string()
    .required("É necessário informar o Estado*")
    .max(30, "É necessário informar um válido*")
}) 

export default function SignUp({navigation, route}){
  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  //Show or hide password digits
  const [isFocused, setIsFocused] = useState(null);
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const { avatar, nome, email, data_nasc, cpf, tel } = route.params;

  const handleFocus = (inputName) => {
    setIsFocused(inputName);
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const nextStep = () => {
    console.log(`nome: ${nome}, email: ${email}, avatar: ${avatar}, data_nasc: ${data_nasc}, 
    cpf: ${cpf}, tel: ${tel}, cep: ${cep}, bairro: ${bairro}, rua: ${rua}, numero: ${numero},
    complemento: ${complemento}, cidade: ${cidade}, estado: ${estado}`);
    navigation.navigate('SignUp_Screen4', { avatar, nome, email, data_nasc, cpf, tel, cep, bairro, rua,
    numero, complemento, cidade, estado });
  }

  function handleSignIn(){
    nextStep();
  }  

  return(
    <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header2}>
            <Text style={styles.title}>Endereço 📌</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.emailTitleText}>Cep</Text>
            <Text style={[styles.emailTitleText, {marginLeft: 95}]}>Bairro</Text>
          </View>

          <View style={styles.form}>
            <View style={{flexDirection: 'row'}}>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'cep' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'cep' ? 1 : null,
                    backgroundColor: isFocused === 'cep' ? COLORS.white : '#efeff1',
                    width: 110
                  }]}
              >
                <Controller
                  control={control} 
                  name="cep"
                  render={({ field: { onChange } }) => (
                    <TextInputMask
                      type={'zip-code'}
                      onChangeText={(text) => {setCep(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('cep')}
                      value={cep}
                      placeholder='CEP'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='numeric'
                      style={{width: "100%"}}
                      maxLength={9}
                    />
                  )}
                />
              </View>

              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'bairro' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'bairro' ? 1 : null,
                    backgroundColor: isFocused === 'bairro' ? COLORS.white : '#efeff1',
                    width: 225,
                    marginLeft: 10
                  }]}
              >
                <Controller
                  control={control} 
                  name="bairro"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setBairro(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('bairro')}
                      value={bairro}
                      placeholder='Informe o bairro'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={30}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {errors.cep && <Text style={styles.labelError}>{errors.cep?.message}</Text>} 
            {errors.bairro && 
              <Text 
                style={[
                  styles.labelError, {marginLeft: errors.cep ? 60 : 206}
                ]}>
                {errors.bairro?.message}
              </Text>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
          </View>
          <View style={styles.form}>
            <Text style={styles.emailTitleText}>{`Complemento`}</Text>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'complemento' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'complemento' ? 1 : null,
                    backgroundColor: isFocused === 'complemento' ? COLORS.white : '#efeff1'
                  }]}
              >
                <Controller
                  control={control} 
                  name="complemento"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setComplemento(text); onChange(text)}}
                      onBlur={handleBlur}
                      value={complemento}
                      onFocus={() => handleFocus('complemento')}
                      placeholder='Complemento'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={30}
                    />
                  )}
                />
              </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {errors.complemento && <Text style={styles.labelError}>{errors.complemento?.message}</Text>}
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.emailTitleText}>Rua</Text>
            <Text style={[styles.emailTitleText, {marginLeft: 210}]}>Número</Text>
          </View>

          <View style={styles.form}>
            <View style={{flexDirection: 'row'}}>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'rua' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'rua' ? 1 : null,
                    backgroundColor: isFocused === 'rua' ? COLORS.white : '#efeff1',
                    width: 225
                  }]}
              >
                <Controller
                  control={control} 
                  name="rua"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setRua(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('rua')}
                      value={rua}
                      placeholder='Informe o nome da rua'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={50}
                    />
                  )}
                />
              </View>

              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'numero' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'numero' ? 1 : null,
                    backgroundColor: isFocused === 'numero' ? COLORS.white : '#efeff1',
                    width: 115,
                    marginLeft: 10
                  }]}
              >
                <Controller
                  control={control} 
                  name="numero"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setNumero(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('numero')}
                      value={numero}
                      placeholder='N°'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='number-pad'
                      style={{width: "100%"}}
                      maxLength={5}
                    />
                  )}
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {errors.rua && <Text style={styles.labelError}>{errors.rua?.message}</Text>} 
            {errors.numero && 
              <Text 
                style={[
                  styles.labelError, {marginLeft: errors.rua ? 60 : 239}
                ]}>
                {errors.numero?.message}
              </Text>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.emailTitleText}>Cidade</Text>
            <Text style={[styles.emailTitleText, {marginLeft: 130}]}>Estado</Text>
          </View>

          <View style={styles.form}>
            <View style={{flexDirection: 'row'}}>
              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'cidade' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'cidade' ? 1 : null,
                    backgroundColor: isFocused === 'cidade' ? COLORS.white : '#efeff1',
                    width: 170
                  }]}
              >
                <Controller
                  control={control} 
                  name="cidade"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setCidade(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('cidade')}
                      value={cidade}
                      placeholder='Cidade'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={50}
                    />
                  )}
                />
              </View>

              <View 
                style={[
                  styles.input, {
                    borderColor: errors.username ? COLORS.error : isFocused === 'estado' ? COLORS.primary : null,
                    borderWidth: errors.username ? 1 : isFocused === 'estado' ? 1 : null,
                    backgroundColor: isFocused === 'estado' ? COLORS.white : '#efeff1',
                    width: 170,
                    marginLeft: 10
                  }]}
              >
                <Controller
                  control={control} 
                  name="estado"
                  render={({ field: { onChange } }) => (
                    <TextInput
                      onChangeText={(text) => {setEstado(text); onChange(text)}}
                      onBlur={handleBlur}
                      onFocus={() => handleFocus('estado')}
                      value={estado}
                      placeholder='Estado'  
                      placeholderTextColor={COLORS.grey}
                      keyboardType='default'
                      style={{width: "100%"}}
                      maxLength={30}
                    />
                  )}
                />
              </View>
              
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            {errors.cidade && <Text style={styles.labelError}>{errors.cidade?.message}</Text>} 
            {errors.estado && 
              <Text 
                style={[
                  styles.labelError, {marginLeft: errors.cidade ? 40 : 202}
                ]}>
                {errors.estado?.message}
              </Text>
            }
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
    paddingBottom: 55
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
  }
})