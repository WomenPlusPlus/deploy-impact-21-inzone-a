import React from "react";
import {View, Text, TouchableOpacity,} from "react-native";


export default function QuestionsNumber(props) {
    let examQuestionsJ = JSON.parse(props.qDATA);//const versus let????

    return (
    <View style={{flexDirection: "row", padding: 50,}}>
        {examQuestionsJ.map((value, index) => (
            <View key={index} style={{backgroundColor: props.qNumber===index ? "#2196F3": "#F0FFFF", padding:20, borderRadius:60,}}><TouchableOpacity onPress={()=>props.setQuestion(index)}><Text>{index+1}</Text></TouchableOpacity></View>))}
    </View>);
};





