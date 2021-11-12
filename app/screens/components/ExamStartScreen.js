import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";


export default function ExamStartScreen(props) {
    
    
    return (
    <View style={styles.screen}>
      <Text style={{ padding: 20 }}>Today's Exam</Text>
      <View style={styles.examBox}>
        <Text style={{ marginBottom: 20 }}>BIOLOGY 1</Text>
        <Text>🕒 2 hours</Text>
        <Text>📋 3 Questions</Text>
      </View>
      <View style={styles.button} >
        <TouchableOpacity onPress={props.onPressGo}>
          <Text style={{textAlign:"center"}}>Go to Exam &gt; </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  examBox: {
    
    width: "90%",
    padding: 30,
    backgroundColor: "#B0C4DE",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#778899",
    marginTop: 30,
    height: 30,
    justifyContent:"center"
  },
});
