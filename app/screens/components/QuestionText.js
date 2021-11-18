import React from "react";
import {View, Text} from "react-native"
import examQuestions from "../examQuestions";


export default function QuestionText(props) {
  return (
    <View>
      <Text>{examQuestions.results[props.qText].Question_Text}</Text>
    </View>
  );
}
