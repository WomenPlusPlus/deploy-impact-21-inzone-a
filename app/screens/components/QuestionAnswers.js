import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuestionAnswers(props) {
  let examQuestionsJ = JSON.parse(props.qDATA); //const versus let????

  const answers = examQuestionsJ[props.qAnswer].Question_Answers;
  console.log(answers);
  const q_objectId = examQuestionsJ[props.qAnswer].objectId;
  const [selectedIndex, setSelectedIndex] = useState(false);

  useEffect(() => {
    setSelectedIndex(false);
  }, [q_objectId]);

  // This helps if you have an array of components (that are not custom)
  // Otherwise the value is changed for all buttons as you said
  function handleChangeColor(index) {
    setSelectedIndex(index);}
    
const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(q_objectId, value);
      console.log(q_objectId);
      console.log(value);
    } catch (e) {
      console.log("not saved");
    }
  };
  //The following getData, clearStorage, getAllKeys are used to test the code
  const getData = async () => {
    const savedAnswer = await AsyncStorage.getItem("randid");
    if (savedAnswer !== null) {
      console.log(savedAnswer);
    } else {
      console.log("it's empty");
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };
  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      console.log(keys);
    } catch (e) {
      console.log("no keys");
    }
  };

  return (
    <View>
      {answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          onPress={(e) => {
            handleChangeColor(index);
            props.changeSkip(answer); //can be index instead of answer
          }}
          style={{
            backgroundColor: index === selectedIndex ? "blue" : "#DDDDDD",
          }}
        >
          <Text>{answer}</Text>
        </TouchableOpacity>
      ))}
      {/* <Button title="get data" onPress={() => clearStorage()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
