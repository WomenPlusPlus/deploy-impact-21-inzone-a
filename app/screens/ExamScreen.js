import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import examQuestions from "./examQuestions";
import ExamStartScreen from "./components/ExamStartScreen";
import ExamQuestionScreen from "./components/ExamQuestionScreen";
import ExamSubmitScreen from "./components/ExamSubmitScreen";

export default function ExamScreen(props) {
  const [isGoToExam, setIsGoToExam] = useState(false);
  const [isSubmitExam, setIsSubmitExam] = useState(false);
  function pressGoHandler() {
    setIsGoToExam(true);
  }

  function handleSubmit() {
    setIsGoToExam(false);
    setIsSubmitExam(true);
  }
  

  let content = <ExamStartScreen onPressGo={pressGoHandler} />;
  if (isGoToExam) {
    content = <ExamQuestionScreen submit={handleSubmit}/>}
  
  else if (isSubmitExam) {
    content = <ExamSubmitScreen />
  }

    

  

  return <View style={styles.screen}>{content}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
