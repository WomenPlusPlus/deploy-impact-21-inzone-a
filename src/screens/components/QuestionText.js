import React from "react";
import {View, Text} from "react-native"

export default function QuestionText(props) {

let examQuestionsJ = JSON.parse(props.qDATA);//const versus let????

  return (
    <View>
      <Text>{examQuestionsJ[props.qText].QuestionNumber}: {examQuestionsJ[props.qText].Question}</Text>
    </View>
  );
}





