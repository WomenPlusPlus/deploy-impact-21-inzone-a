import React from "react";
import {View, Text} from "react-native"

export default function Timer(props) {
return <View><Text style={{fontWeight:"bold"}}>00:1{props.addTime}</Text></View>;

};
