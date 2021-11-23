import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  //clear AsyncStorage
  async function clearAsyncStorage() {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log(error);
    }
    if (keys.length !== 0) {
      try {
        await AsyncStorage.multiRemove(keys);
        console.log("AsyncStorage cleared.");
      } catch (e) {
        console.log(error);
      }
    }
    else {
      console.log("Nothing to clear.");
    }
  }

  //upload bulk questions from array
  const questions = [
    { question: "What is yellow+red", options: ["orange", "blue"] },
    { question: "How many months in a year?", options: ["10", "12"] },
    { question: "Only one SEVEN", options: ["one"] },
    { question: "How many sprints has deploy(impact)?", options: ["1", "2", "4", "6", "8"] },];

  async function uploadQuestions(questionData) {
    const EX = Parse.Object.extend("Exam");
    const exam = new EX();
    exam.id = "ov3ZyYOEbT";
    const relationE = exam.relation("Questions");

    const QX = new Parse.Object.extend("ExamQuestion");
    const queryQ = new Parse.Query(QX);
    const archive = await queryQ.find();
    const allQ = archive.map(value => value.get("Question_Text"));

    const OX = new Parse.Object.extend("ExamQuestionOption");
    for (const d of questionData) {
      if (!allQ.includes(d.question)) {
        const QUESTION = new QX();
        QUESTION.set("Exam_ID", exam);
        QUESTION.set("Question_Text", d.question);
        for (let s of d.options) {
          const OPTION = new OX();
          OPTION.set("Option", s);
          OPTION.set("Question", QUESTION);
          await OPTION.save();
          const relation = QUESTION.relation("Options");
          relation.add(OPTION);
        }
        await QUESTION.save();
        relationE.add(QUESTION);
      }
      await exam.save();
    }
  }

  //manually input new question
  const [myQuestion, onChangeQuestion] = useState("");
  const [myOption1, onChangeOption1] = useState("");
  const [myOption2, onChangeOption2] = useState("");
  const [myOption3, onChangeOption3] = useState("");

  async function createQuestion(Question, Options) {
    try {
      if (Question !== "" && Options.length > 0) {
        uploadQuestions([{ question: Question, options: Options }])
        onChangeQuestion("");
        onChangeOption1("");
        onChangeOption2("");
        onChangeOption3("");
      }
      else {
        alert("Enter question and options first.")
      }
    } catch (error) {
      console.log(error);
    }
  }

  function createQuestionButton(Question, Option1, Option2, Option3) {
    const Options = [];
    if (Option1 !== "") { Options.push(Option1); }
    if (Option2 !== "") { Options.push(Option2); }
    if (Option3 !== "") { Options.push(Option3); }
    console.log(Options)
    if (Question !== "" && Options.length > 0) {
      return (
        <View style={styles.button}>
        <TouchableOpacity onPress={() => { createQuestion(Question, Options) }}>
          <Text style={{ textAlign: "center" }}>Upload question "{Question}" with options [{Options.join(";")}] &gt;</Text>
        </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <View style={styles.screen}>

      <View style={styles.button}>
        <TouchableOpacity onPress={clearAsyncStorage}>
          <Text style={{ textAlign: "center" }}>Clear Async Storage &gt;</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.questionBox}>
        <Text>Enter a question with at least one option to upload to parse.</Text>
        <TextInput style={styles.input} onChangeText={onChangeQuestion} value={myQuestion} placeholder="Enter a question..." />
        <TextInput style={styles.input} onChangeText={onChangeOption1} value={myOption1} placeholder="Enter an option..." />
        <TextInput style={styles.input} onChangeText={onChangeOption2} value={myOption2} placeholder="Enter another option..." />
        <TextInput style={styles.input} onChangeText={onChangeOption3} value={myOption3} placeholder="Enter another option..." />
      {createQuestionButton(myQuestion, myOption1, myOption2, myOption3)}
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => { uploadQuestions(questions) }}>
          <Text style={{ textAlign: "center" }}>Upload questions from array &gt;</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionBox: {
    width: "50%",
    padding: 20,
    backgroundColor: "#B0C4DE",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 5,
    backgroundColor: "#778899",
    margin: 20,
    height: 30,
    justifyContent: "center",
  },
  input: {
    height: 30,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
});


