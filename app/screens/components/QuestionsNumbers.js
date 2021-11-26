import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function QuestionsNumber(props) {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (props.isSubmit === "Submit answer") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [props.isSubmit]);

  function changeBubbleColor(item) {
    if (props.qNumber === item) {
      if (props.isSubmit === "Submit answer") {
        return { backgroundColor: "#2196F3", padding: 20, borderRadius: 60 };
      } else {
        return { backgroundColor: "gray", padding: 20, borderRadius: 60 };
      }
    } else {
      return { backgroundColor: "#F0FFFF", padding: 20, borderRadius: 60 };
    }
  }

  return (
    <View style={{ flexDirection: "row", padding: 50 }}>
      <ScrollView horizontal={true}>
        {props.aDATA.map((key) => (
          <View key={key} style={changeBubbleColor(key)}>
            <TouchableOpacity
              onPress={() => props.selectQuestion(key)}
              disabled={isDisabled}
            >
              <Text>{key}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
