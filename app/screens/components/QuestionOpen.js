import React from "react";
import { TextInput, View} from "react-native";

export default function QuestionOpen() {
    return (
        <View style={{borderWidth:1}}>
        <TextInput multiline={true} numberOfLines = {4} placeholder="Write your answer here"></TextInput>    
        </View>
    )
}