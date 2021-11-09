import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from "react-native"
import examQuestions from "../examQuestions";

export default function QuestionAnswers(props) {
   return (
    <View>
        <TouchableOpacity style={styles.answer}>
          <Text>{examQuestions.results[props.qAnswer].Question_Answer_Correct}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answer}>
          <Text>{examQuestions.results[props.qAnswer].Question_Answer_Wrong}</Text>
        </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
    answer: {
        backgroundColor: "#DDDDDD",
        padding: 10,
      },
    })