import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import examQuestions from "../examQuestions";

export default function QuestionsNumber(props) {
    return (
    <View style={{flexDirection: "row", padding: 50,}}>
        {examQuestions.results.map((value, index) => (
            <TouchableOpacity key={index} style={{padding:20, borderRadius:40}}><Text>{index+1}</Text></TouchableOpacity>))}
    </View>);
};





// style={{backgroundColor: props.qNumber===index ? "#2196F3": "#F0FFFF", padding:20, borderRadius:40}}