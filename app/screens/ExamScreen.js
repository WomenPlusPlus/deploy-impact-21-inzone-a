import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ExamStartScreen from "./components/ExamStartScreen";
import ExamQuestionScreen from "./components/ExamQuestionScreen";
import ExamSubmitScreen from "./components/ExamSubmitScreen";
import ExamTimerScreen from "./components/ExamTimerScreen";

export default function ExamScreen(props) {
  const [isGoToExam, setIsGoToExam] = useState(false);
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [isSubmitExam, setIsSubmitExam] = useState(false);
  
  function pressGoHandler() {
    setIsGoToExam(true);
  }
  function pressStartHandler(){
    setIsGoToExam(false);
    setIsStartTimer(true);
  }

  function handleSubmit() {
    setIsStartTimer(false);
    setIsSubmitExam(true);
  }
  

  let content = <ExamStartScreen onPressGo={pressGoHandler} />;
  if (isGoToExam) {
    content = <ExamTimerScreen onPressStart={pressStartHandler}/>}
  else if (isStartTimer){
    content = <ExamQuestionScreen submit={handleSubmit}/>
  }
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
