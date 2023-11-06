import React, {createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, senha) => {
    setLoading(true);

    try {
      const response = await axios.post('https://api-seekpet-prisma.onrender.com/login', {
        email: email,
        senha, senha,

      });

      if(response.status === 200){
        const {token, usuario} = response.data;
        setUserToken(token);  
        setUserInfo(userInfo);

        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(usuario));

        console.log(usuario);
        console.log("User Token: " + token);

      }else {
        Alert.alert('Deu errado');
      }

    } catch (error) {
      console.log({error: "Fudeu-se"});
    } finally {
      setLoading(false);
    }
  };  
  
  const logout = () => {
    setLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setLoading(false);
  }
  
  const isLoggedIn = async () => {
    try {
      setLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if(userInfo){
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return(
    <AuthContext.Provider value={{login, logout, userToken, userInfo, loading}}>
      {children}
    </AuthContext.Provider>
  )
}