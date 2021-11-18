import React, {useState} from "react";
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

export default function App() {
  const [isAvailable, setIsAvailable] = useState("not available");

  async function boolExamQuestionsAsyncStorage() {
    try {
      const data = await AsyncStorage.getItem('exam');
      if (data !== null) {
        console.log('Exam questions in async storage.')
        setIsAvailable("available");
      }
      else {
        console.log('Async storage empty.')
        setIsAvailable("not available");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getExamQuestionsParse() {
    try {
      const parseQuery = new Parse.Query("ExamQuestion");
      let result = await parseQuery.find();
      if (result !== null) {
        await AsyncStorage.setItem('exam', JSON.stringify(result));
        console.log('Got new exam questions from parse and set in async storage.')
        setIsAvailable("available")
        return 'success'
      }
      } catch (error) {
      console.log(error);
      return 'error'
    }
  }

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
          children={props => <ExamScreen pIsAvailable={isAvailable} getQ={getExamQuestionsParse}/>}
          listeners={{
            tabPress: async (e) => {
              //YES this overrides anything already in the AsyncStorage as we always want the newest exams
              let result = await getExamQuestionsParse();
              if (result !== 'success') {await boolExamQuestionsAsyncStorage()};
            }
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
