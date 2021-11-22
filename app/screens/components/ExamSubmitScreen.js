import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Header from "./Header";
import Timer from "./Timer";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ExamSubmitScreen(props) {
  
  async function uploadExamQuestionsParse() {
    try {
      console.log(props.answers)
      //const answers = new Parse.Object.extend('Answers');
      //const students = new Student();
      //students.set('FirstName', FirstName);
      //students.set('FamilyName', FamilyName);
      //await students.save();
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
        flex: 1,
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