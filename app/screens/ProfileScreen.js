import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HORIZONTAL } from "react-native/Libraries/Components/ScrollView/ScrollViewContext";


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
  
  return (
    <View>
      <Text>Student First Name:</Text>
      <Text>{name}</Text>
      
      <Text>Student Family Name</Text>
      <Text>{familyName}</Text>
    </View>
  );
}
