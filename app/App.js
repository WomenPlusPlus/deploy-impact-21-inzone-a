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

      //OPTION1
      const E1 = Parse.Object.extend("Exam");
      const Q1 = Parse.Object.extend("ExamQuestion");
      const O1 = Parse.Object.extend("ExamQuestionOption");
      const innerQueryE = new Parse.Query(E1);
      innerQueryE.equalTo("objectId", "ov3ZyYOEbT");
      const innerQueryQ = new Parse.Query(Q1);
      innerQueryQ.matchesQuery("Exam_ID", innerQueryE);
      const query1 = new Parse.Query(O1);
      query1.matchesQuery("Question", innerQueryQ);
      query1.include("Question")
      query1.include("Question.Exam_ID")
      const result1 = await query1.find();
      let result1ALL = [];
      for (let r of result1) {
        let question = r.toJSON().Question;
        let found = result1ALL.findIndex(elem => elem.objectId === question.objectId);
        if (found == -1) {
          question.Options = [{option: r.toJSON().Option, optionId: r.toJSON().objectId}];
          result1ALL.push(question)
        }
        else
        {
          result1ALL[found].Options.push({option: r.toJSON().Option, optionId: r.toJSON().objectId});
        }
      }

      //OPTION2
      /*const Q2 = Parse.Object.extend("ExamQuestion");
      const query2 = new Parse.Query(Q2);
      let result2 = await query2.find();
      let result2ALL = [];
      for (let Option of result2) {
        let OptionsRelation = Option.relation("Options");
        let Options = await OptionsRelation.query().find();
        let myJ = Option.toJSON();
        myJ.Options = Options.map(obj => obj.get("Option"));
        result2ALL.push(myJ)
      }*/

      let result = result1ALL;

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
