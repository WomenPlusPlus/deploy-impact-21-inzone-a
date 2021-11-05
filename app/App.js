import React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { initializeParse, useParseQuery } from "@parse/react-native";

initializeParse(
        "https://inzone-a-parse.tools.deployimpact.ch/parse",
        "inzonea",
        "6ijLihTPGPmjC5ADQVeJDmbKMdVPup2o"
);

function HomeScreen({ navigation }) {
        return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
                        <Button
                                onPress={() => navigation.navigate("Exams")}
                                title="Go to Exams"
                        />
                </View>
        );
}

function ExamScreen({ navigation }) {
        return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
                        <Button onPress={() => navigation.goBack()} title="Go back home" />
                </View>
        );
}

const Drawer = createDrawerNavigator();

export default function App() {
        return (
                <NavigationContainer>
                        <Drawer.Navigator initialRouteName="Home">
                                <Drawer.Screen name="Home" component={HomeScreen} />
                                <Drawer.Screen name="Exams" component={ExamScreen} />
                        </Drawer.Navigator>
                </NavigationContainer>
        );
}
