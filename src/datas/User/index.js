import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import COLORS from "../../constants/colors";

export default class User extends Component{

  render(){
    return(
      <View style={styles.feedItem}>
        <Image source={{uri: `https://api-seekpet.onrender.com/uploads/${this.props.data.avatar}`}} style={styles.avatar}/>
        <View style={{flex: 1}}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View>
              <Text style={styles.name}>{this.props.data.name}</Text>
              <Text style={styles.name}>{this.props.data.avatar}</Text>
              <Text style={styles.name}>{this.props.data.cpf}</Text>
              <Text style={styles.name}>{this.props.data.tel}</Text>
              <Text style={styles.name}>{this.props.data.pwd}</Text>
              <Text style={styles.timestamp}>{this.props.data.email}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  }
})