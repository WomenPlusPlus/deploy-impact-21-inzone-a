import React from "react";
import {View, Button, Text, StyleSheet} from "react-native"


export default function Header() {
    return (
  <View style={styles.container}>
    <Text>BIOLOGY 1</Text>
    <Button title="quit exam >" />
  </View>);
}

const styles=StyleSheet.create({
  container: {
    marginVertical:30,
    justifyContent:"center",
    alignContent: "center"
  }

})