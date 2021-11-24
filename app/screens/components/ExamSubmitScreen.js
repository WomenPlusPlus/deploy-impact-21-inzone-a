import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ProgressBarAndroidComponent } from "react-native";
import Header from "./Header";
import Timer from "./Timer";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ExamSubmitScreen(props) {

  async function uploadExamQuestionsParse() {
    const date = new Date();
    const tryUpload = await props.answerUpload(props.answers, date);
    if (tryUpload == 'error') {
      alert('Uploading to parse failed. Storing answers in async storage.')
      try {
        await AsyncStorage.setItem('timestamp', date);
        await AsyncStorage.setItem('answers', JSON.stringify(props.answers));
        console.log('Saved answers in AsyncStorage.');
        props.clear();
        console.log("Deleted props.");
      }
      catch (error) {
        console.log(error);
      }
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
      <TouchableOpacity onPress={props.onPressUpload}>
        <Text style={{ textAlign: "center" }}>Upload Exam from Storage &gt; </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Timer addTime={`${9}`} />
      <View style={styles.textContainer}>
        <Text>You finished! Now try to upload your answers. If this fails, the answers will be stored and you can try again later.</Text>
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