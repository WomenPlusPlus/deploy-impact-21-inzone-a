import React from "react";
import {View, Button, StyleSheet} from "react-native";
import examQuestions from "../examQuestions";

export default function QuestionsNumber(props) {
    return (
    <View style={{flexDirection: "row", padding: 50,}}>
        {examQuestions.results.map((value, index) => (
            <View key={index} style={{backgroundColor: props.qNumber===index ? "#2196F3": "#F0FFFF", padding:20, borderRadius:60,}}><Button title={`${index+1}`}/></View>))}
    </View>);
};





// style={{backgroundColor: props.qNumber===index ? "#2196F3": "#F0FFFF", padding:20, borderRadius:40}}