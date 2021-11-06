import React from "react";
import { StyleSheet, Button, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  FaHome,
  FaPencil,
  FaComments,
  FaPersonBooth,
  FaUser,
  FaUsers,
  FaPencilRuler,
} from "react-icons/fa";

import HomeScreen from "./screens/HomeScreen";
import ExamScreen from "./screens/ExamScreen";
import CommunityScreen from "./screens/CommunityScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { initializeParse, useParseQuery } from "@parse/react-native";

initializeParse(
  "https://inzone-a-parse.tools.deployimpact.ch/parse",
  "inzonea",
  "6ijLihTPGPmjC5ADQVeJDmbKMdVPup2o"
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          options={{ tabBarIcon: ({ tintColor }) => <FaHome /> }}
          component={HomeScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ tintColor }) => <FaPencilRuler /> }}
          name="Exams"
          component={ExamScreen}
        />
        <Tab.Screen
          name="Community"
          options={{ tabBarIcon: ({ tintColor }) => <FaComments /> }}
          component={CommunityScreen}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ tintColor }) => <FaUser /> }}
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
