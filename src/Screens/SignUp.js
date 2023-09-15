import { View, Text, StyleSheet } from 'react-native';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>SignIn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStartColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  Title: {
    fontSize:22,
    fontWeight: 'bold',
  }
})