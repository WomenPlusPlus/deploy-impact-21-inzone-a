import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "./Header";
import QuestionsNumbers from "./QuestionsNumbers";
import Timer from "./Timer";
import QuestionText from "./QuestionText";
import QuestionAnswers from "./QuestionAnswers";
import examQuestions from "../examQuestions";


export default function ExamQuestionScreen(props) {
  const [count, setCount] = useState(0);
  function handleUpdateCount() {
    setCount(count + 1);
  }
 
  return (
    <View>
      <Header />
      <QuestionsNumbers qNumber={count} />
      <View style={{ flexDirection: "row", padding: 20 }}>
        <Text style={{ marginEnd: 50 }}>Question 1 of 2</Text>{/*move to a component?*/}
        <Timer />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        <Button title="🏳️ To be checked" />
      </View>
      <QuestionText qText={count} />
      <QuestionAnswers qAnswer={count} />
      <View style={styles.button}><TouchableOpacity  onPress={count < (examQuestions.results.length-1) ? handleUpdateCount: props.submit}><Text>Skip</Text></TouchableOpacity></View>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    backgroundColor:"#778899", 
  }
}) 
