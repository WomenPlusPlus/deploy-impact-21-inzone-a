import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ExamTimerScreen(props) {
  return (
    <View style={styles.screen}>
      <View style={{marginVertical:20}}>
        <Text>Ready?</Text>
      </View>
      <View style={{marginVertical:20}}>
        <Text style={styles.timer}>OO:OO</Text>
      </View>
      <View style={{marginVertical:20}}>
        <TouchableOpacity style={styles.button} onPress={props.onPressStart}>
          <Text style={{textAlign:"center"}}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    button: {
        backgroundColor: "#778899",
        marginTop: 30,
        height: 30,
        width:70,
        justifyContent:"center"
      },

    timer: {
        fontSize:40,
        fontWeight:"bold"
        
        
    }
  });
