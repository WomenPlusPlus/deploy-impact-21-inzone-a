import React from "react";
import {View, Button} from "react-native";
import examQuestions from "../examQuestions";

export default function QuestionsNumber() {
    return (
    <View style={{flexDirection: "row", padding: 50,}}>
        {examQuestions.results.map(value => (
            <Button title={value.Question_ID} />))}
    </View>);
};