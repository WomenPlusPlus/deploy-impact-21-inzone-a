import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ExamStartScreen from "./components/ExamStartScreen";
import ExamQuestionScreen from "./components/ExamQuestionScreen";


export default function ExamScreen() {
  const [isGoToExam, setIsGoToExam] = useState(false)
  function pressGoHandler (){
          setIsGoToExam(true)}
     
  
  let content = <ExamStartScreen onPressGo={pressGoHandler}/>
  if (isGoToExam) {content = (<ExamQuestionScreen />);}
  
  return (
    <View style={styles.screen}>
    {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    
  },
  
})
