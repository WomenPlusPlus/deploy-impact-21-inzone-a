
import React, {useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExamStartScreen from "./components/ExamStartScreen";
import ExamQuestionScreen from "./components/ExamQuestionScreen";
import ExamSubmitScreen from "./components/ExamSubmitScreen";
import ExamTimerScreen from "./components/ExamTimerScreen";

export default function ExamScreen(props) {
  const [isGoToExam, setIsGoToExam] = useState(false);
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [isSubmitExam, setIsSubmitExam] = useState(false);
  const [isAvailable, setIsAvailable] = useState("");
  const [examQuestions, setExamQuestions] = useState('');//what to put here?
  const [examAnswers, setExamAnswers] = useState([]);//what to put here?

  useEffect(() => {
    setIsAvailable(props.pIsAvailable)
  }, [props.pIsAvailable]);

  async function getExamQuestionsAsyncStorage() {
    try {
      const data = await AsyncStorage.getItem('exam');
      console.log(data)
      if (data !== null) {
        console.log('Got exam questions from async storage.')
        setExamQuestions(data);
        console.log('Set variable "examQuestions".');
        return 'success'
      }
      else {
        console.log('Async storage empty.')
        return 'empty'
      }
    } catch (error) {
      console.log(error);
      return 'error'
    }
  }

  async function pressGoHandler() {
    try {
      let result = await getExamQuestionsAsyncStorage();
      if (result == 'success') {
        alert("The exam is available.")
        setIsGoToExam(true);
      }
      else if (result == 'empty' ) {
        alert("The exam must be downloaded first.")
      }
      else {
        alert("There was an error.")
      }
    } catch (error) {
      alert("There was an error.")
      console.log(error);
    }
  }

  function fisherYatesShuffle(arr){
    //https://www.delftstack.com/howto/javascript/shuffle-array-javascript/
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
  }

  function pressStartHandler(){

    //randomize    
    let allQ = JSON.parse(examQuestions);
    let qarray = allQ.map((value,index) => index+1);
    fisherYatesShuffle(qarray); //shuffle questions
    for (let [index, val] of allQ.entries()) {
      val.QuestionNumber = qarray[index];
      fisherYatesShuffle(val.Options); //shuffle options
    }
    setExamQuestions(JSON.stringify(allQ));

    setIsGoToExam(false);
    setIsStartTimer(true);
  }

  function handleSubmit(answers) {
    setIsStartTimer(false);
    setIsSubmitExam(true);
    console.log(answers)
    setExamAnswers(answers)
  }

 
  

  let content = <ExamStartScreen pIsAvailable={isAvailable} onPressGo={pressGoHandler} onPressReload={props.getQ}/>;
  if (isGoToExam) {
    content = <ExamTimerScreen onPressStart={pressStartHandler}/>}
  else if (isStartTimer){
    content = <ExamQuestionScreen submit={handleSubmit} sDATA={examQuestions} timer={isStartTimer}/>
  }
  else if (isSubmitExam) {
    content = <ExamSubmitScreen answers={examAnswers}/>
  }


  return (
    <View>
      <View style={styles.screen}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  button: {
    backgroundColor: "#778899",
    marginTop: 30,
    height: 30,
    justifyContent:"center"
  },
});
