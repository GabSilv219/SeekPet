import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export const InputLogin = ({placeholder, value, onChangeText, secureTextEntry, icon}) => {
  return(
    <View>
      <TextInput
        style={styles.inputLogin}
        placeholder={placeholder}
        icon={icon}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  inputLogin: {
    height: 40,
    fontSize: 15,
    marginLeft: 25
  },
});
