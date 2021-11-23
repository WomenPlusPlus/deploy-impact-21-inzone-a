import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { HORIZONTAL } from "react-native/Libraries/Components/ScrollView/ScrollViewContext";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function ProfileScreen() {
  const [name, setName] = useState("")
  const [familyName, setFamilyName] = useState("")
  const [first, onChangeFirst] = useState("");
  const [family, onChangeFamily] = useState("");

  //  useEffect(() => {
  //    async function getProfile() {
  //      const parseQuery = new Parse.Query("Student");
  //      let user = await parseQuery.first();
  //      console.dir(user)
  //      setName(user.get("FirstName"))
  //      setFamilyName(user.get("FamilyName"))
  //    }
  //    getProfile();
  //  })

  async function createStudent(FirstName, FamilyName) {
    try {
      if (FirstName !== "" && FamilyName !== "") {
        const Student = new Parse.Object.extend('Student');
        // Create a new instance of that class.
        const students = new Student();
        students.set('FirstName', FirstName);
        students.set('FamilyName', FamilyName);
        await students.save();
        alert("Student " + FirstName + " " + FamilyName + " created.")
        onChangeFirst("");
        onChangeFamily("");
      }
      else {
        alert("Enter names first.")
      }
    } catch (error) {
      console.log(error);
    }
  }

  function studentText(FirstName, FamilyName) {
    if (FirstName !== "" && FamilyName !== "") {
      return (
        <TouchableOpacity onPress={() => { createStudent(first, family) }}>
          <Text style={{ textAlign: "center" }}>Create student called {FirstName} {FamilyName} &gt;</Text>
        </TouchableOpacity>
      )
    }
  }

  async function clearAsyncStorage() {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log(error);
    }
    console.log(keys);

    if (keys.length !== 0) {
      await AsyncStorage.multiRemove(keys);
      console.log("AsyncStorage cleared.")
    }
    else { console.log("Nothing to clear.") }
  }


  async function createQuestions() {
    const mydata = [
      { Question_Text: "What is yellow+red", Question_Answers: ["orange", "blue"] },
      { Question_Text: "How many months in a year?", Question_Answers: ["10", "12"] },
      { Question_Text: "Only one THREE", Question_Answers: ["one"] }];
    console.log(mydata)

    const EX = Parse.Object.extend("Exam");
    var exam = new EX();
    exam.id = "ov3ZyYOEbT";
    var relationE = exam.relation("Questions");

    var QX = new Parse.Object.extend("ExamQuestion");
    const queryQ = new Parse.Query(QX);
    let archive = await queryQ.find();
    const allQ = archive.map(value => value.get("Question_Text"));

    var OX = new Parse.Object.extend("ExamQuestionOption");

    for (let d of mydata) {
      if (!allQ.includes(d.Question_Text)) {
        var QUESTION = new QX();
        QUESTION.set("Exam_ID", exam);
        QUESTION.set("Question_Text", d.Question_Text);
        for (let s of d.Question_Answers) {
          var OPTION = new OX();
          OPTION.set("Option", s);
          OPTION.set("Question", QUESTION);
          await OPTION.save();
          var relation = QUESTION.relation("Options");
          relation.add(OPTION);
        }
        await QUESTION.save();
        relationE.add(QUESTION);
      }
      await exam.save();
    }
  }


  return (
    <View>
      <Text>Student First Name:</Text>
      <Text>{name}</Text>

      <Text>Student Family Name</Text>
      <Text>{familyName}</Text>

      <TouchableOpacity onPress={clearAsyncStorage}>
        <Text style={{ textAlign: "center" }}>Clear Async Storage &gt;</Text>
      </TouchableOpacity>

      <View>
        <Text>Please enter your first and family name to create a new student</Text>
        <TextInput style={styles.input} onChangeText={onChangeFirst} value={first} placeholder="Enter your first name" />
        <TextInput style={styles.input} onChangeText={onChangeFamily} value={family} placeholder="Enter your family name" />
      </View>
      {studentText(first, family)}

      <TouchableOpacity onPress={createQuestions}>
        <Text style={{ textAlign: "center" }}>Create questions &gt;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
}

)



