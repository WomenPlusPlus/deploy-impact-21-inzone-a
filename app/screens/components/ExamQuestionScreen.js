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
  const [answerArray, setAnswer] = useState([]);

  const examQuestions = props.sDATA; //correct like this?
  let examQuestionsJ = JSON.parse(examQuestions); //const versus let????

  function handleSubmitAnswer() {
    if (label === "Submit answer") {
      console.log("Answer saved to ASYNC: " + answerArray);
     
      
    } else {
      console.log("Nothing saved to ASYNC");
    }
    setCount(count + 1);
    setChangeLabel("Skip");
  }

  

  function changeQuestion(qNum) {
    setCount(qNum);
  }
  function changeLabel(selectedAnswer) {
    setAnswer((prevValue)=> {return [...prevValue, selectedAnswer]});
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
          <TouchableOpacity
            onPress={
              count < examQuestionsJ.length - 1
                ? handleSubmitAnswer
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
