import { React, Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default class LoadingScreen extends Component{

  componentDidMount() {
    const auths = getAuth();
    onAuthStateChanged(auths, (user) => {
      this.props.navigation.navigate(user ? "App" : "Auth")
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})