import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Header from "./Header";
import Timer from "./Timer";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ExamSubmitScreen(props) {

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

  async function uploadExamQuestionsParse() {
    const date = new Date();
    const tryUpload = await answerUpload(props.answers, date);
    if (tryUpload == 'error') {
      alert('Uploading to parse failed. Storing answers in async storage.')
      try {
        await AsyncStorage.setItem('timestamp', date);
        await AsyncStorage.setItem('answers', JSON.stringify(props.answers));
        console.log('Saved answers in AsyncStorage.');
        props.clear();//TEST
        console.log("Deleted props.")
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  async function uploadExamQuestionsStorage() {
    try {
      const timestamp = await AsyncStorage.getItem('timestamp');
      const answersString = await AsyncStorage.getItem('answers');

      if (timestamp !== null && answersString !== null) {
        const answers = JSON.parse(answersString);
        const date = new Date(timestamp);

        if (answers.length > 0) { //check if date is a Date?
          const tryUpload = await answerUpload(answers, date);
          if (tryUpload == 'success') {
            await AsyncStorage.multiRemove(['answers', 'timestamp']);
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

  let submitButton;
  if (props.answers.length>0) {
    submitButton = (
      <TouchableOpacity onPress={(e) => { uploadExamQuestionsParse() }}>
        <Text style={{ textAlign: "center" }}>Submit Exam answers &gt; </Text>
      </TouchableOpacity>
    );
  }
  else {
    submitButton = (
      <TouchableOpacity onPress={(e) => { uploadExamQuestionsStorage() }}>
        <Text style={{ textAlign: "center" }}>Upload Exam from Storage &gt; </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Timer addTime={`${9}`} />
      <View style={styles.textContainer}>
        <Text>1 of 4 to be checked again</Text>
        <Text>1 of 4 not answered</Text>
      </View>
      <View>
        <View style={styles.button} >
          {submitButton}
        </View>
      </View>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  textContainer: {
    marginVertical: 30,

  },
  button: {
    alignItems: "center",
    backgroundColor: "#778899",
    padding: 10,
    margin: 10,
  },


}

)