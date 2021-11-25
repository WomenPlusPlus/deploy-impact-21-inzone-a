import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import spokyLogo from '../assets/spokyLogo.png'

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={spokyLogo} style={{width:375, height: 115 }}/>
    </View>
  );
}
