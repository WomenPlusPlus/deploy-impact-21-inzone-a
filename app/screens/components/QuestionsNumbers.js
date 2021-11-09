import React from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native";
import examQuestions from "../examQuestions";

export default function QuestionsNumber(props) {
    return (
    <View style={{flexDirection: "row", padding: 50,}}>
        {examQuestions.results.map((value, index) => (
            <TouchableOpacity style={{backgroundColor: props.qNumber===index ? "#2196F3": "#F0FFFF", 
            padding:20, borderRadius:"50%", margin:"#2196F3"}}>{index+1}</TouchableOpacity>))}
    </View>);
};
