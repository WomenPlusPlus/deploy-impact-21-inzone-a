import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./screens/HomeScreen";
import ExamScreen from "./screens/ExamScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import SettingsScreen from "./screens/SettingsScreen";

import { initializeParse } from "@parse/react-native";

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
        console.log('Exam questions in async storage.');
        setIsAvailable("available");
      }
      else {
        console.log('Async storage empty.');
        setIsAvailable("not available");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getExamQuestionsParse() {
    try {

      //OPTION1 (need all the nesting to only get a specific exam)
      const exam = Parse.Object.extend("Exam");
      const question = Parse.Object.extend("ExamQuestion");
      const option = Parse.Object.extend("ExamQuestionOption");
      const innerQueryExam = new Parse.Query(exam);
      innerQueryExam.equalTo("objectId", "ov3ZyYOEbT"); //hard coded for now
      const innerQueryQuestion = new Parse.Query(question);
      innerQueryQuestion.matchesQuery("Exam_ID", innerQueryExam);
      const query = new Parse.Query(option);
      query.matchesQuery("Question", innerQueryQuestion);
      query.include("Question");
      query.select("Option","Question"); //do not include solutions
      //query.include("Question.Exam_ID"); //not needed when hard-coded above
      const countOptions = await query.count();
      const queryResult = await query.limit(countOptions).find(); //because standard limit is 100
      //https://docs.parseplatform.org/js/guide/#limits-and-other-considerations
      let result = [];
      for (const r of queryResult) {
        const question = r.toJSON().Question;
        const option = {option: r.toJSON().Option, optionId: r.toJSON().objectId};
        const found = result.findIndex(elem => elem.objectId === question.objectId);
        if (found == -1) {
          question.Options = [option];
          result.push(question);
        }
        else
        {
          result[found].Options.push(option);
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


      if (result !== null) {
        await AsyncStorage.setItem('exam', JSON.stringify(result));
        console.log('Got new exam questions from parse and set in async storage.');
        setIsAvailable("available");
        return 'success';
      }
      } catch (error) {
      console.log(error);
      return 'error';
    }
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{ tabBarLabelPosition:"below-icon", headerTitle:"Spoky", headerTitleAlign:"center", headerShown:true}}>
        <Tab.Screen
          name="Spoky"
          options={{tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={24} color="black" /> }}
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ tintColor }) => <FontAwesome5 name="pencil-ruler" size={24} color="black" /> }}
          name="Exams"
          children={props => <ExamScreen  pIsAvailable={isAvailable} getQ={getExamQuestionsParse}/>}
          listeners={{
            tabPress: async (e) => {
              //this overrides anything already in the AsyncStorage as we always want the newest exams
              let result = await getExamQuestionsParse();
              if (result !== 'success') {await boolExamQuestionsAsyncStorage()};
            }
          }}
        />
        <Tab.Screen
          name="Feedback"
          options={{ tabBarIcon: ({ tintColor }) => <FontAwesome name="comments" size={24} color="black" /> }}
          component={FeedbackScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ tintColor }) => <FontAwesome name="user" size={24} color="black" /> }}
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}
