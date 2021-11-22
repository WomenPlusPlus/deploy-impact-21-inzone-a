import React from "react";
import {View, Text, TouchableOpacity,} from "react-native";


export default function QuestionsNumber(props) {

    return (
    <View style={{flexDirection: "row", padding: 50,}}>
        {props.aDATA.map(key => (
            <View key={key} style={{backgroundColor: props.qNumber===key ? "#2196F3": "#F0FFFF", padding:20, borderRadius:60,}}>
                <TouchableOpacity onPress={()=>props.setQuestion(key)}>
                    <Text>{key}</Text>
                </TouchableOpacity>
            </View>))}
    </View>);
};





