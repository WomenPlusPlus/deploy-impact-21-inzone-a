import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Header from "./Header";
import Timer from "./Timer";


export default function ExamSubmitScreen() {
return (
    <View style={styles.container}>
     <Header/>  
     <Timer addTime={`${9}`}/>
    <View style={styles.textContainer}>
    <Text>1 of 4 to be checked again</Text> 
    <Text>1 of 4 not answered</Text>   
    </View>
    <View>
    <TouchableOpacity style={styles.button}><Text>Start Review</Text></TouchableOpacity>
    <TouchableOpacity style={styles.button}><Text>Submit Exam</Text></TouchableOpacity>   
    </View> 
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
      },
      textContainer : {
          marginVertical: 30,

      },
      button: {
        alignItems: "center",
        backgroundColor: "#778899",
        padding: 10
      },
    

}

)