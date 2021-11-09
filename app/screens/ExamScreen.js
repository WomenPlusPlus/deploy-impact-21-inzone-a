import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "./components/Header";
import QuestionsNumbers from "./components/QuestionsNumbers";
import Timer from "./components/Timer";
import QuestionText from "./components/QuestionText";
import QuestionAnswers from "./components/QuestionAnswers";

export default function ExamScreen() {
  
  return (
    <View style={styles.container}>
      <Header />
      <QuestionsNumbers />
      <View style={{flexDirection: "row", padding: 20,}}>
        <Text style={{ marginEnd: 50 }}>Question 1 of 2</Text>  {/*move to a component?*/}
        <Timer /> 
      </View>
      <View style={{flexDirection: "row", justifyContent:"flex-end", padding:20}}>
        <Button title="🏳️ To be checked" />
      </View>
      <QuestionText />
      <QuestionAnswers />
      <Button title="skip"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: 450, //to simulate mobile screen on expo web browser
    marginStart: 500, //to simulate mobile screen on expo web browser
  },
  
});
