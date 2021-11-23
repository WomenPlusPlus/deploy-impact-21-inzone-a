import React, {useState} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";


export default function QuestionsNumber(props) {

    const [bubbleColor, setBubbleColor] = useState("")
    
    function changeBubbleColor(index) {
        if (props.qNumber===index) {
            return {backgroundColor: props.isSubmit==="Submit answer" ? "gray" : "#2196F3", padding:20, borderRadius:60,}}
        else {return {backgroundColor: "#F0FFFF", padding:20, borderRadius:60,}
        }
    }


    return (
    <View style={{flexDirection: "row", padding: 50,}}>
        <ScrollView horizontal={true}  >
        {props.aDATA.map((key, index) => (
            <View key={key} style={changeBubbleColor(key)}>
                <TouchableOpacity onPress={()=>props.setQuestion(key)}>
                <Text>{index+1}</Text>
                </TouchableOpacity>
            </View>))}
        </ScrollView>
    </View>);
};

