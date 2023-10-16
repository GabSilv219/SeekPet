import { View, Text, StyleSheet, ScrollView } from 'react-native';
import COLORS from '../constants/colors';

export default function Notifications() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.Title}>Notifications</Text>
      </View>
      <View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 5
  },
  Title: {
    fontSize:22,
    fontWeight: 'bold',
  }
})