
import React, {useState } from "react";
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

  const [examQuestions, setExamQuestions] = useState('');//what to put here?

  async function getExamQuestionsParse() {
    try {
      const parseQuery = new Parse.Query("ExamQuestion");
      let result = await parseQuery.find();
      if (result !== null) {
        await AsyncStorage.setItem('exam', JSON.stringify(result));
        console.log('Got exam questions from parse and set in async storage.')
      }
      } catch (error) {
      console.log(error);
    }
  }

  async function getExamQuestionsAsyncStorage() {
    try {
      const data = await AsyncStorage.getItem('exam');
      console.log(data)
      if (data !== null) {
        console.log('Got exam questions from async storage.')
        setExamQuestions(data);
        console.log('Set "examQuestions".');
        return 'success'
      }
      else {
        console.log('Async storage empty.')
        return 'stop'
      }
    } catch (error) {
      console.log(error);
    }
  }

  function clearAsyncStorage() {
    AsyncStorage.clear();
    console.log('AsyncStorage cleared.')
  }

  function showProps() {
    console.log(props)
  }

  async function pressGoHandler() {
    try {
      let result = await getExamQuestionsAsyncStorage();
      console.log(result)
      if (result == 'success') {
        alert("The exam is available.")
        setIsGoToExam(true);
      }
      else {
        alert("The exam must be downloaded first.")
        console.log('Async storage empty.')
      }
    } catch (error) {
      alert("Error.")
      console.log(error);
    }
  }
  function pressStartHandler(){
    setIsGoToExam(false);
    setIsStartTimer(true);
  }

  function handleSubmit() {
    setIsStartTimer(false);
    setIsSubmitExam(true);
  }
  

  let content = <ExamStartScreen onPressGo={pressGoHandler}/>;
  if (isGoToExam) {
    content = <ExamTimerScreen onPressStart={pressStartHandler}/>}
  else if (isStartTimer){
    content = <ExamQuestionScreen submit={handleSubmit} sDATA={examQuestions}/>
  }
  else if (isSubmitExam) {
    content = <ExamSubmitScreen />
  }


  return (
    <View>
      <View style={styles.screen}>{content}</View>
      <View style={styles.button} >
        <TouchableOpacity onPress={showProps}>
          <Text style={{textAlign:"center"}}>Show props in console &gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button} >
        <TouchableOpacity onPress={getExamQuestionsParse}>
          <Text style={{textAlign:"center"}}>Get exam questions from parse and set in async storage &gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button} >
        <TouchableOpacity onPress={getExamQuestionsAsyncStorage}>
          <Text style={{textAlign:"center"}}>Get exam questions from async storage and set variable &gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button} >
        <TouchableOpacity onPress={clearAsyncStorage}>
          <Text style={{textAlign:"center"}}>Clear Async Storage &gt;</Text>
        </TouchableOpacity>
      </View>
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
