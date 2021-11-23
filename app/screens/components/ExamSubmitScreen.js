import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Header from "./Header";
import Timer from "./Timer";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ExamSubmitScreen(props) {
  
  async function uploadExamQuestionsParse() {
    try {
      console.log(props.answers)
      const Question = new Parse.Object.extend('ExamQuestion');
      const Option = new Parse.Object.extend('ExamQuestionOption');
      const Answers = new Parse.Object.extend('ExamAnswer');

      for (let a of props.answers)
      {
        var question = new Question();
        question.id = a.qCode;
        var option = new Option();
        option.id = a.oCode;
        var answers = new Answers();
        answers.set("Question", question);
        answers.set("QuestionNumber", a.qNum);
        answers.set("Answer", a.qAnswer);
        answers.set("Options", [option]); //ready for multi-select answers
        await answers.save();
      }

      await answers.save();
      alert('Exam answers uploaded.');
      } catch (error) {
      console.log(error);
      return 'error'
    }
  }

return (
    <View style={styles.container}>
     <Header/>  
     <Timer addTime={`${9}`}/>
    <View style={styles.textContainer}>
    <Text>1 of 4 to be checked again</Text> 
    <Text>1 of 4 not answered</Text>   
    </View>
    <View>
    <TouchableOpacity style={styles.button}><Text>Start Review</Text></TouchableOpacity>
    <TouchableOpacity style={styles.button}><Text>Submit Exam</Text></TouchableOpacity>
    <View style={styles.button} >
        <TouchableOpacity onPress={(e)=> {uploadExamQuestionsParse()}}>
          <Text style={{textAlign:"center"}}>Upload Exam &gt; </Text>
        </TouchableOpacity>
      </View> 
    </View> 
    </View>);
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: "center",
        paddingHorizontal: 10
      },
      textContainer : {
          marginVertical: 30,

      },
      button: {
        alignItems: "center",
        backgroundColor: "#778899",
        padding: 10
      },
    

}

)