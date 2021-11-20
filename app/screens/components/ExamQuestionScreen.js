import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "./Header";
import QuestionsNumbers from "./QuestionsNumbers";
import Timer from "./Timer";
import QuestionText from "./QuestionText";
import QuestionAnswers from "./QuestionAnswers";

export default function ExamQuestionScreen(props) {
  const [count, setCount] = useState(0);
  const [label, setChangeLabel] = useState("Skip");
  const [answerObject, setAnswerObject] = useState({ qNum: "", qAnswer: "", qCode:"" });
  const [answerArray, setAnswerArray] = useState([]);

  const examQuestions = props.sDATA; //correct like this?
  let examQuestionsJ = JSON.parse(examQuestions); //const versus let????

  function handleSubmitAnswer() {
    setChangeLabel("Skip");
    if (count == examQuestionsJ.length - 1) {
      props.submit(answerArray);
    }
    setCount(count + 1);
  }

  function changeQuestion(qNum) {
    setCount(qNum);
  }
  function changeLabel(selectedAnswer, qObject) {
    // check if user has changed answer while on the screen 
    var answerExists = answerArray.findIndex((answer, index) => {
      if (answer["qNum"] === count+1) {
        return true;
      }
    })
    // Update existing answer or add new one
    if (answerExists !== -1) {
      answerArray[answerExists]["qAnswer"] = selectedAnswer
    } else {
      answerArray.push({qNum: count+1, qAnswer: selectedAnswer, qCode: qObject})
    }
    setChangeLabel("Submit answer");
  }

  return (
    <View>
      <Header />

      <QuestionsNumbers
        qNumber={count}
        setQuestion={changeQuestion}
        qDATA={props.sDATA}
      />

      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ marginEnd: 50, fontSize: 20, fontWeight: "bold" }}>
          Question {count + 1} of {examQuestionsJ.length}
        </Text>
        {/*move to a component?*/}
        <Timer addTime={count * 2} />
      </View>

      <View style={{ marginBottom: 20 }}>
        <QuestionText qText={count} qDATA={props.sDATA} />
        {/* best way to pass props along multiple times? */}
      </View>
      <View>
        <QuestionAnswers
          qAnswer={count}
          changeSkip={changeLabel}
          qDATA={props.sDATA}
        />
        <View style={styles.button}>
          <TouchableOpacity onPress={handleSubmitAnswer}>
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
