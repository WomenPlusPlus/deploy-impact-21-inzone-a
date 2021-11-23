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
      if (FirstName !== "" && FamilyName!== "") {
        const Student = new Parse.Object.extend('Student');
        // Create a new instance of that class.
        const students = new Student();
        students.set('FirstName', FirstName);
        students.set('FamilyName', FamilyName);
        await students.save();
        alert("Student " + FirstName +  " " + FamilyName + " created.")
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
    if (FirstName !== "" && FamilyName!== "") {
      return (
      <TouchableOpacity onPress={() => {createStudent(first, family)}}>
        <Text style={{textAlign:"center"}}>Create student called {FirstName} {FamilyName} &gt;</Text> 
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
    else
      {console.log("Nothing to clear.")}
  }

  return (
    <View>
      <Text>Student First Name:</Text>
      <Text>{name}</Text>
      
      <Text>Student Family Name</Text>
      <Text>{familyName}</Text>

        <TouchableOpacity onPress={clearAsyncStorage}>
          <Text style={{textAlign:"center"}}>Clear Async Storage &gt;</Text>
        </TouchableOpacity>

        <View>
        <Text>Please enter your first and family name to create a new student</Text>
          <TextInput style={styles.input} onChangeText={onChangeFirst} value={first} placeholder="Enter your first name"/>
          <TextInput style={styles.input} onChangeText={onChangeFamily} value={family} placeholder="Enter your family name"/>
        </View>
        {studentText(first, family)}
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



