import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "./Header";
import QuestionsNumbers from "./QuestionsNumbers";
import Timer from "./Timer";
import QuestionText from "./QuestionText";
import QuestionAnswers from "./QuestionAnswers";
import examQuestions from "../examQuestions";

export default function ExamQuestionScreen(props) {
  const [count, setCount] = useState(0);
  const [label, setChangeLabel] = useState("Skip");
  const [isSelected, setIsSelected] = useState(false);

  function handleChangeColor() {
    setIsSelected(!isSelected);
  }

  function handleUpdateCount() {
    setCount(count + 1);
  }
  function changeQuestion(qNum) {
    setCount(qNum);
  }
  function changeLabel() {
    setChangeLabel("Submit answer");
  }

  return (
    <View>
      <Header />
      <QuestionsNumbers qNumber={count} setQuestion={changeQuestion} />
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ marginEnd: 50, fontSize: 20, fontWeight: "bold" }}>
          Question {count + 1} of {examQuestions.results.length}
        </Text>
        {/*move to a component?*/}
        <Timer addTime={count * 2} />
      </View>

      <View style={{ marginBottom: 20 }}>
        <QuestionText qText={count} />
      </View>
      <View>
        <QuestionAnswers
          qAnswer={count}
          changeSkip={changeLabel}
          changeColor={handleChangeColor}
          selected={isSelected}
        />
        <View style={styles.button}>
          <TouchableOpacity
            onPress={
              count < examQuestions.results.length - 1
                ? handleUpdateCount
                : props.submit
            }
          >
            <Text style={{ textAlign: "center" }}>{label}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#778899",
  },
});
