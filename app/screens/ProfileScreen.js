import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";


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
      <h2>Student First Name:</h2><Text>{name}</Text>
      <h2>Student Family Name</h2><Text>{familyName}</Text>
    </View>
  );
}
