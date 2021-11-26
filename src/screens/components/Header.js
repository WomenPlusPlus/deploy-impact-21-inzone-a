import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"


export default function Header(props) {

  return (
    <View style={styles.container}>
      <Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold"}}>deploy(impact)</Text>
      <View style={styles.button} >
        <TouchableOpacity onPress={props.finish}>
          <Text style={{ textAlign: "center"}}>Quit the exam and go to submit &gt; </Text>
        </TouchableOpacity>
      </View>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 5,
    backgroundColor: "#778899",
    margin: 5,
    height: 20,
    justifyContent: "center"
  },

})