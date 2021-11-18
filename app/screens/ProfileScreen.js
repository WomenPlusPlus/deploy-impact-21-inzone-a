import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { HORIZONTAL } from "react-native/Libraries/Components/ScrollView/ScrollViewContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ProfileScreen() {
  const [name, setName] = useState("")
  const [familyName, setFamilyName] = useState("")

  useEffect(() => {
    async function getProfile() {
      const parseQuery = new Parse.Query("Student");
      let user = await parseQuery.first();
      console.dir(user)
      setName(user.get("FirstName"))
      setFamilyName(user.get("FamilyName"))
    }
    getProfile();
  })
  
  function clearAsyncStorage() {
    AsyncStorage.clear();
    console.log('AsyncStorage cleared.')
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
    </View>
  );
}
