import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";             
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputLogin } from '../components/Inputs';
import { AuthContext } from '../contexts/auth';

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

export default function Login({navigation}){
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  const {login} = useContext(AuthContext);

  console.log(login); 

  return(
    <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.login}>
          <Image source={require("../assets/owner-dog.png")} style={{width: 303, height: 300, alignSelf: 'center', marginRight: 25}} />

          <Text style={styles.title}>Entrar</Text>
          <View style={styles.form}>
            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value }}) => (
                  <InputLogin 
                    onChangeText={(text) => {setEmail(text); onChange(text)}}
                    onBlur={onBlur}
                    value={email}
                    placeholder='Email' 
                  />
                )}
              />
              <View style={styles.inputField}></View> 

              <Ionicons name="person" size={20} color="#8A8F9E" style={styles.iconEmail}/>
            </View>

            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

            <View style={{marginTop: 32}}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value }}) => (
                  <InputLogin 
                    onChangeText={(text) => {setSenha(text); onChange(text)}}
                    onBlur={onBlur}
                    value={senha}
                    placeholder='Senha'
                    style={{marginLeft: 25}}
                    secureTextEntry={isPasswordShown}
                  />
                )}
              />

              <View style={styles.inputField}></View>

              <Ionicons name="lock-closed" size={20} color="#8A8F9E" 
                style={[
                  styles.iconPWD, {
                    bottom: errors.password ? 31 : 10
                  }
                ]}
              />
              
              {errors.password && <Text style={styles.labelError}>{errors.password.message}</Text>}

              <TouchableOpacity 
                style={[
                  styles.viewPwd, {
                    bottom: errors.password ? 25 : 5
                  }
                ]}
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

              <TouchableOpacity>
                <Text 
                  style={[
                    styles.forgotPWDText, {
                      marginTop: errors.password ? -14 : 15
                    }
                  ]}
                  >
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
            
            </View>
            
          </View>

          <Button
              onPress={handleSubmit (() => {
                setLoading(true);
                login(email, senha);
              })}
              filled
              title={
                loading ? (
                  <ActivityIndicator size={20} color={COLORS.white} style={{paddingTop: 5}}/>
                ) : (
                  "Enviar"
                )}
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              disabled={loading}
            >
            </Button>

            <View style={styles.footer}>
              <Text style={{fontSize: 16, color: COLORS.black}}>Ainda não possui uma conta?</Text>
              <Pressable onPress={() => navigation.navigate("SignUp_Screen1")}>
                <Text style={styles.loginNavigate}> 
                  Registre-se
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
    backgroundColor: "#FFFFFF", 
    marginTop: -10,
    paddingBottom: 25
  },
  login: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: -10
  },
  title: {
    marginTop: 32,
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 40,
    textAlign: 'center'
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 10
  },
  inputField: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  viewPwd: {
    position: "absolute",
    right: 12,
    // bottom: 5,
  },
  iconEmail: {
    position: "absolute",
    bottom: 10,
  },
  iconPWD: {
    position: "absolute",
  },
  forgotPWDText: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    fontSize: 12,
    color: COLORS.secondary,
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