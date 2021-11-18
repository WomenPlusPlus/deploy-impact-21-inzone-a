import React from "react";
import {View, Text} from "react-native"

export default function QuestionText(props) {

let examQuestionsJ = JSON.parse(props.qDATA);//const versus let????

  return (
    <View>
      <Text>{examQuestionsJ[props.qText].Question_Text}</Text>
    </View>
  );
}





export default function QuestionText(props) {
  return (
    <View>
      <Text>{examQuestions.results[props.qText].Question_Text}</Text>
    </View>
  );
}

