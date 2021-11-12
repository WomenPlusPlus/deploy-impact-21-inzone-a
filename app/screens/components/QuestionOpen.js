import React from "react";
import { TextInput, View} from "react-native";

export default function QuestionOpen() {
    return (
        <View>
        <TextInput multiline={true} numberOfLines = {4}></TextInput>    
        </View>
    )
}