import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Home</Text>
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