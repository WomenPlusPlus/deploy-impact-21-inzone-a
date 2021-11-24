import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "./Header";
import QuestionsNumbers from "./QuestionsNumbers";
import Timer from "./Timer";
import QuestionText from "./QuestionText";
import QuestionOptions from "./QuestionOptions";

export default function ExamQuestionScreen(props) {
  const [item, setItem] = useState(1);
  const [label, setChangeLabel] = useState("Skip");
  const [answerArray, setAnswerArray] = useState([]);
  const [questionArray, setQuestionArray] = useState([]);
  

  useEffect(() => {
    setQuestionArray(
      examQuestionsJ
        .map((value) => value.QuestionNumber)
        .sort(function (a, b) {
          return a - b;
        })
    );
    console.log("SET");
  }, [props.Timer]);

  const examQuestions = props.sDATA; //correct like this?
  let examQuestionsJ = JSON.parse(examQuestions); //const versus let????

  function handleSubmitAnswer() {
    setChangeLabel("Skip");
    if (questionArray.length == 1) {
      props.submit(answerArray);
    }
    const next = questionArray.findIndex((num) => num === item) + 1;
    if (next < questionArray.length) {
      setItem(questionArray[next]);
      console.log("item:" + item);
    } else {
      setItem(questionArray[0]);
      console.log("item:" + item);
    };
  eliminateBubbleIfAnswered();}
    
    function eliminateBubbleIfAnswered() {
    //wrap in checking if answerarray empty
    console.log(answerArray);
    var answerExists = answerArray.findIndex((answer, index) => {
      if (answer["qNum"] === item) {
        return true;
      }
    });
    //if there is answer for question===item it doesn't show that bubble
    if (answerExists !== -1) {
      setQuestionArray(questionArray.filter((q) => q !== item));
    }
  }

  function changeQuestion(key) {
    setItem(questionArray[questionArray.findIndex((num) => num === key)]);
  }
  function changeLabel(selectedAnswer, qObject) {
    // check if user has changed answer while on the screen
    var answerExists = answerArray.findIndex((answer, index) => {
      if (answer["qNum"] === item) {
        return true;
      }
    });
    // Update existing answer or add new one
    if (answerExists !== -1) {
      answerArray[answerExists]["qAnswer"] = selectedAnswer.option;
      answerArray[answerExists]["oCode"] = selectedAnswer.optionId;
    } else {
      answerArray.push({
        qNum: item,
        qAnswer: selectedAnswer.option,
        qCode: qObject,
        oCode: selectedAnswer.optionId,
        //qCode: examQuestionsJ[examQuestionsJ.findIndex(({ QuestionNumber }) => QuestionNumber === item)].objectId
      });
    }
    setChangeLabel("Submit answer");
  }

  

  return (
    <View>
      <Header />
      <View style={{ width: "100%", heigth: 20 }}>
        <QuestionsNumbers
          qNumber={item}
          setQuestion={changeQuestion}
          aDATA={questionArray}
          qDATA={props.sDATA}
          isSubmit={label}
          // isSkip={handleSkip}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ marginEnd: 50, fontSize: 20, fontWeight: "bold" }}>
          Question {item} of {examQuestionsJ.length}
        </Text>
        {/*move to a component?*/}
        <Timer />
      </View>

      <View style={{ marginBottom: 20 }}>
        <QuestionText
          qText={examQuestionsJ.findIndex(
            ({ QuestionNumber }) => QuestionNumber === item
          )}
          qDATA={props.sDATA}
        />
        {/* best way to pass props along multiple times? */}
      </View>

      <ScrollView>
        <QuestionOptions
          qOption={examQuestionsJ.findIndex(
            ({ QuestionNumber }) => QuestionNumber === item
          )}
          changeSkip={changeLabel}
          qDATA={props.sDATA}
        />
        <View style={styles.button}>
          <TouchableOpacity onPress={handleSubmitAnswer}>
            <Text style={{ textAlign: "center" }}>{label}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#778899",
  },
});
