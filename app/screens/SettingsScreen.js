import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
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

  // //upload bulk questions from array by clicking button commented out below
  // const questions = [
  //   { question: "Are the questions in the Spoky app graded?", options: [{ option: "Yes", points: 1 }, { option: "No", points: 0 }] },
  // ];

  async function uploadQuestions(questionData) {
    try {
      const EX = Parse.Object.extend("Exam");
      const exam = new EX();
      exam.id = "ov3ZyYOEbT";
      const relationE = exam.relation("Questions");

      const QX = new Parse.Object.extend("ExamQuestion");
      const queryQ = new Parse.Query(QX);
      const archive = await queryQ.find();
      const allQ = archive.map(value => value.get("Question"));

      const OX = new Parse.Object.extend("ExamQuestionOption");
      for (const d of questionData) {
        if (allQ.length==0 || !allQ.includes(d.question)) {
          const QUESTION = new QX();
          QUESTION.set("Exam", exam);
          QUESTION.set("Question", d.question);
          for (let s of d.options) {
            const OPTION = new OX();
            OPTION.set("Option", s.option);
            OPTION.set("Points", s.points);
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
    catch (e) { console.log(e); }
  }

  //manually input new question
  const [myQuestion, onChangeQuestion] = useState("");
  const [myOption1, onChangeOption1] = useState("");
  const [myPoints1, onChangePoints1] = useState("0");
  const [myOption2, onChangeOption2] = useState("");
  const [myPoints2, onChangePoints2] = useState("0");
  const [myOption3, onChangeOption3] = useState("");
  const [myPoints3, onChangePoints3] = useState("0");
  const [myOption4, onChangeOption4] = useState("");
  const [myPoints4, onChangePoints4] = useState("0");
  const [myOption5, onChangeOption5] = useState("");
  const [myPoints5, onChangePoints5] = useState("0");

  async function createQuestion(Question, Options) {
    try {
      const checkNum = Options.map(val=>isNaN(val.points)).indexOf(true);
      if (Question !== "" && Options.length > 0 && checkNum == -1) { //CHECK NUMBERS
        uploadQuestions([{ question: Question, options: Options }]);
        onChangeQuestion("");
        onChangeOption1("");
        onChangePoints1("0");
        onChangeOption2("");
        onChangePoints2("0");
        onChangeOption3("");
        onChangePoints3("0");
        onChangeOption4("");
        onChangePoints4("0");
        onChangeOption5("");
        onChangePoints5("0");
      }
      else {
        if (Options.map(val=>isNaN(val.points)).indexOf(true) !== -1)
        {
          alert("Enter numeric point values only.")
        }
        else {
          alert("Enter question and options first.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function createQuestionButton(Question,
    Option1, Option2, Option3, Option4, Option5,
    Points1, Points2, Points3, Points4, Points5) {
    const Options = [];
    //unclear why a loop did not work here
    if (Option1 !== "" && Points1 !== "") { Options.push({ option: Option1, points: Number(Points1) }); }
    if (Option2 !== "" && Points2 !== "") { Options.push({ option: Option2, points: Number(Points2) }); }
    if (Option3 !== "" && Points3 !== "") { Options.push({ option: Option3, points: Number(Points3) }); }
    if (Option4 !== "" && Points4 !== "") { Options.push({ option: Option4, points: Number(Points4) }); }
    if (Option5 !== "" && Points5 !== "") { Options.push({ option: Option5, points: Number(Points5) }); }
    if (Question !== "" && Options.length > 0) {
      return (
        <View style={styles.button2}>
          <TouchableOpacity onPress={() => { createQuestion(Question, Options) }}>
            <Text>Upload question "{Question}" with option:points [{Options.map(val => val.option + ":" + val.points).join("; ")}] &gt;</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }


  //validate answers
  async function calculatePoints() {
    try {
      const Attempt = Parse.Object.extend("ExamAttempt");
      const attempt = new Parse.Query(Attempt);
      attempt.descending("Timestamp");
      const lastAttempt = await attempt.first();

      const Answers = new Parse.Object.extend("ExamAnswer");
      const answers = new Parse.Query(Answers);
      answers.equalTo("Attempt", lastAttempt);
      answers.include("Options");
      const attemptAnswers = await answers.find();
      const myAnswers = JSON.parse(JSON.stringify(attemptAnswers));
      let myPoints = 0;
      for (const a of myAnswers) {
        if (myAnswers.Options!==""){
          for (const o of a.Options){
            if (o.Points!==undefined){
              myPoints = myPoints + o.Points;
            }
          }
        }
      }
      alert(myPoints==0 ? "You made zero points." : (myPoints==1 ? "You made one point." : "You made " + myPoints + " points."))
      lastAttempt.set("TotalPoints",myPoints)
      await lastAttempt.save()
    }
    catch (e) { console.log(e); }
  }


  return (
    <View style={styles.screen}>
      <ScrollView>
      <Text style={{ marginBottom: 10, padding: 5 }}>The settings contain some useful functions not yet embedded otherwise.</Text>

      <View style={styles.button}>
        <TouchableOpacity onPress={clearAsyncStorage}>
          <Text style={{ textAlign: "center" }}>Clear Async Storage &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* 
      //upload bulk questions by entering them in the questions variable commented out above
      <View style={styles.button}>
        <TouchableOpacity onPress={() => { uploadQuestions(questions) }}>
          <Text style={{ textAlign: "center" }}>Upload questions from array in the file SettingsScreen.js &gt;</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.button}>
        <TouchableOpacity onPress={() => { calculatePoints() }}>
          <Text style={{ textAlign: "center" }}>Calculate points of last exam attempt &gt;</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.questionBox}>
        <Text>Enter a question with at least one option to upload to parse.</Text>
        <TextInput style={styles.input} onChangeText={onChangeQuestion} value={myQuestion} placeholder="Enter a question..." />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 5 }}>
            <TextInput style={styles.input} onChangeText={onChangeOption1} value={myOption1} placeholder="Enter an option..." />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput style={styles.input} onChangeText={onChangePoints1} value={myPoints1} placeholder="Points" />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 5 }}>
            <TextInput style={styles.input} onChangeText={onChangeOption2} value={myOption2} placeholder="Enter an option..." />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput style={styles.input} onChangeText={onChangePoints2} value={myPoints2} placeholder="Points" />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 5 }}>
            <TextInput style={styles.input} onChangeText={onChangeOption3} value={myOption3} placeholder="Enter an option..." />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput style={styles.input} onChangeText={onChangePoints3} value={myPoints3} placeholder="Points" />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 5 }}>
            <TextInput style={styles.input} onChangeText={onChangeOption4} value={myOption4} placeholder="Enter an option..." />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput style={styles.input} onChangeText={onChangePoints4} value={myPoints4} placeholder="Points" />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 5 }}>
            <TextInput style={styles.input} onChangeText={onChangeOption5} value={myOption5} placeholder="Enter an option..." />
          </View>
          <View style={{ flex: 1 }}>
            <TextInput style={styles.input} onChangeText={onChangePoints5} value={myPoints5} placeholder="Points" />
          </View>
        </View>
        {createQuestionButton(myQuestion,
          myOption1, myOption2, myOption3, myOption4, myOption5,
          myPoints1, myPoints2, myPoints3, myPoints4, myPoints5)}
      </View>

      </ScrollView>
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
    padding: 20,
    backgroundColor: "#B0C4DE",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    padding: 5,
    backgroundColor: "#778899",
    marginBottom: 20,
    height: 30,
    justifyContent: "center",
  },
  button2: {
    padding: 5,
    backgroundColor: "#778899",
    justifyContent: "center",
  },
  input: {
    height: 25,
    margin: 5,
    borderWidth: 1,
    padding: 2,
  },
});


