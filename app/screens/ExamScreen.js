
import React, { useEffect, useState } from "react";
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
  const [isStored, setIsStored] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [examQuestions, setExamQuestions] = useState('');//what to put here?
  const [examAnswers, setExamAnswers] = useState([]);//what to put here?

  useEffect(() => {
    setIsAvailable(props.pIsAvailable)
  }, [props.pIsAvailable]);

  useEffect(() => {
    setIsStored(props.pIsStored)
  }, [props.pIsStored]);

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
        setIsGoToExam(true);
      }
      else if (result == 'empty') {
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

  function fisherYatesShuffle(arr) {
    //https://www.delftstack.com/howto/javascript/shuffle-array-javascript/
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); //random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  function pressStartHandler() {
    //randomize    
    let allQ = JSON.parse(examQuestions);
    let qarray = allQ.map((value, index) => index + 1);
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

  function clearAnswers() {
    setExamAnswers([]);
  }

  async function uploadExamAnswersStorage() {
    try {
      const timestamp = await AsyncStorage.getItem('timestamp');
      const answersString = await AsyncStorage.getItem('answers');

      if (timestamp !== null && answersString !== null) {
        const answers = JSON.parse(answersString);
        const date = new Date(timestamp);

        if (answers.length > 0) { //check if date is a Date?
          const tryUpload = await answerUpload(answers, date);
          if (tryUpload == 'success') {
            props.clearA();
            alert('Answers removed from Storage after Upload.')
          }
          else {
            alert('Still not able to upload. Try again later.')
          }
        }
      }
      else {
        alert('No exam in AsyncStorage.')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function answerUpload(answers, timestamp) {
    try {
      const Question = new Parse.Object.extend('ExamQuestion');
      const Option = new Parse.Object.extend('ExamQuestionOption');
      const Answers = new Parse.Object.extend('ExamAnswer');

      const EX = Parse.Object.extend("Exam");
      const exam = new EX();
      exam.id = "ov3ZyYOEbT";

      const Attempt = new Parse.Object.extend('ExamAttempt');
      var attempt = new Attempt();
      attempt.set("Timestamp", timestamp);
      attempt.set("Exam", exam);
      await attempt.save();

      for (let a of answers) {
        var question = new Question();
        question.id = a.qCode;
        var option = new Option();
        option.id = a.oCode;
        var answers = new Answers();
        answers.set("Attempt", attempt);
        answers.set("Question", question);
        answers.set("QuestionNumber", a.qNum);
        answers.set("Answers", [a.qAnswer]); //ready for multi-select answers
        answers.set("Options", [option]); //ready for multi-select answers
        await answers.save();
      }
      alert('Exam answers uploaded.');
      return 'success';
    }
    catch (e) {
      console.log(e)
      return 'error';
    }
  }

  let content = <ExamStartScreen 
    pIsAvailable={isAvailable}
    pIsStored={isStored}
    onPressClear={props.clearA}
    onPressUpload={uploadExamAnswersStorage}
    onPressGo={pressGoHandler}
    onPressReload={props.getQ} 
    />;
  if (isGoToExam) {
    content = <ExamTimerScreen onPressStart={pressStartHandler} />
  }
  else if (isStartTimer) {
    content = <ExamQuestionScreen submit={handleSubmit} sDATA={examQuestions} timer={isStartTimer} />
  }
  else if (isSubmitExam) {
    content = <ExamSubmitScreen
    answers={examAnswers}
    clear={clearAnswers}
    answerUpload={answerUpload}
    onPressUpload={uploadExamAnswersStorage}
    />
  }

  return (
    <View style={styles.screen}>{content}</View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
