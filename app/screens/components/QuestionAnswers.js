import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import examQuestions from "../examQuestions";

export default function QuestionAnswers(props) {
  const answers=
    examQuestions.results[props.qAnswer].Question_Answers;
 
  return (
    <View>
      <TouchableOpacity style={styles.answer}>
        {answers.map((answer, index) => (
          <Text key={index}>{answer}</Text>
        ))}
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  answer: {
    backgroundColor: "#DDDDDD",
  },
});
