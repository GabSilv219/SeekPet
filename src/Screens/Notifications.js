import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Notifications() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.Title}>Notifications</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStartColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  Title: {
    fontSize:22,
    fontWeight: 'bold',
  }
})