import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import ExamScreen from "./screens/ExamScreen";
import CommunityScreen from "./screens/CommunityScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { initializeParse, useParseQuery } from "@parse/react-native";

// HOTFIX https://github.com/parse-community/Parse-SDK-JS/issues/1335
initializeParse(
  "https://inzone-a-parse.tools.deployimpact.ch/parse",
  "inzonea",
  "6ijLihTPGPmjC5ADQVeJDmbKMdVPup2o"
);

const Tab = createBottomTabNavigator();

async function getExamQuestionsParse() {
  try {
    const parseQuery = new Parse.Query("ExamQuestion");
    let result = await parseQuery.find();
    if (result !== null) {
      await AsyncStorage.setItem('exam', JSON.stringify(result));
      console.log('Got exam questions from parse and set in async storage.')
    }
    } catch (error) {
    console.log(error);
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{ tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={24} color="black" /> }}
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ tintColor }) => <FontAwesome5 name="pencil-ruler" size={24} color="black" /> }}
          name="Exams"
          component={ExamScreen}
          listeners={{
            tabPress: (e) => {getExamQuestionsParse()}
          }}
        />
        <Tab.Screen
          name="Community"
          options={{ tabBarIcon: ({ tintColor }) => <FontAwesome name="comments" size={24} color="black" /> }}
          component={CommunityScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ tintColor }) => <FontAwesome name="user" size={24} color="black" /> }}
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
