import React, {useState} from "react";
import {View, Text, TouchableOpacity,} from "react-native";


export default function QuestionsNumber(props) {
    let examQuestionsJ = JSON.parse(props.qDATA);//const versus let????
    const [bubbleColor, setBubbleColor] = useState("")
    
    function changeBubbleColor(index) {
        if (props.qNumber===index) {
            return {backgroundColor: props.isSubmit==="Submit answer" ? "red" : "#2196F3", padding:20, borderRadius:60,}}
        else {return {backgroundColor: "#F0FFFF", padding:20, borderRadius:60,}
        }
    }


    return (
    <View style={{flexDirection: "row", padding: 50,}}>
        {examQuestionsJ.map((value, index) => (
            <View key={index} style={changeBubbleColor(index)}><TouchableOpacity onPress={()=>props.setQuestion(index)}><Text>{index+1}</Text></TouchableOpacity></View>))}
    </View>);
};





