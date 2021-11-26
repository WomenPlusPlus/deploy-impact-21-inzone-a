import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ExamStartScreen(props) {

  let button;

  if (props.pIsAvailable == 'available' && props.pIsStored == 'not stored') {
    button = (<>
      <View style={styles.button} >
        <TouchableOpacity onPress={props.onPressGo}>
          <Text style={{ textAlign: "center" }}>Go to Exam &gt; </Text>
        </TouchableOpacity>
      </View></>
    );
  }

  if (props.pIsStored == 'stored') {
    button = (
      <View style={{ width: "90%" }}>
        <Text style={{ padding: 5 }}>Old answers still in the storage. Upload them or clear them before you can start a new attempt.</Text>
        <View style={styles.button} >
          <TouchableOpacity onPress={props.onPressUpload}>
            <Text style={{ textAlign: "center" }}>Upload answers&gt; </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button} >
          <TouchableOpacity onPress={props.onPressClear}>
            <Text style={{ textAlign: "center" }}>Clear answers&gt; </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (props.pIsAvailable == 'not available' && props.pIsStored == 'not stored') {
    button = (<>
      <View style={styles.button} >
        <TouchableOpacity onPress={props.onPressReload}>
          <Text style={{ textAlign: "center" }}>Download Exam &gt; </Text>
        </TouchableOpacity>
      </View></>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={{ padding: 20 }}>Today's Exam</Text>
      <View style={styles.examBox}>
        <Text style={{ fontWeight:"bold", marginBottom: 20 }}>deploy(impact)</Text>
        <Text>🕒 2 hours</Text>
        <Text>📋 4 Questions</Text>
        <Text>This exam is {props.pIsAvailable}.</Text>
      </View>
      {button}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },
  examBox: {
    width: "90%",
    padding: 30,
    backgroundColor: "#B0C4DE",
    justifyContent: "space-evenly",
  },
  button: {
    padding: 5,
    backgroundColor: "#778899",
    marginTop: 30,
    height: 30,
    justifyContent: "center"
  },
});
