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
  const [skippedArray, setSkipArray] = useState([]);

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

  const examQuestions = props.sDATA;
  let examQuestionsJ = JSON.parse(examQuestions);

  function goToNextQuestionIfLastSubmitExam() {
    setChangeLabel("Skip");
    if (questionArray.length === 1 && label === "Submit answer") {
      console.log("lenght:" + questionArray.length);
      props.submit(answerArray);
    }
    const next = questionArray.findIndex((num) => num === item) + 1;
    if (next < questionArray.length) {
      setItem(questionArray[next]);
      console.log("item:" + item);
    } else {
      setItem(questionArray[0]);
      console.log("item:" + item);
    }
    eliminateBubbleIfAnswered();
  }

  function finishExamEarly() {
    props.submit(answerArray);
  }

  function eliminateBubbleIfAnswered() {
    //wrap in checking if answerarray empty
    console.log("answerArray: " + answerArray);
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

  function goToQuestionBubble(key) {
    setItem(questionArray[questionArray.findIndex((num) => num === key)]);
  }
  function saveAnswer(selectedAnswer, qObject) {
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
      });
    }
    setChangeLabel("Submit answer");
  }

  //checks if skipped question already exist in skippedArray,
  //adds it if not
  //deletes it if question is answered,
  function handleIsSkip() {
    var skippedAnswerExist = skippedArray.findIndex((answer) => {
      if (answer["qNum"] === item) {
        return true;
      }
    });
    if (skippedAnswerExist !== -1) {
      if (label === "Submit answer") {
        setSkipArray(skippedArray.filter((s) => s["qNum"] !== item));
        console.log(skippedArray);
      } else if (label === "Skip") {
        console.log(skippedArray);
        return;
      }
    } else if (label === "Skip") {
      skippedArray.push({ qNum: item });
      console.log(skippedArray);
    }
  }

  return (
    <View>
      <Header finish={finishExamEarly} />
      <View style={{ width: "100%", heigth: 20 }}>
        <QuestionsNumbers
          qNumber={item}
          selectQuestion={goToQuestionBubble}
          aDATA={questionArray}
          qDATA={props.sDATA}
          isSubmit={label}
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

        <Timer />
      </View>

      <View style={{ marginBottom: 20 }}>
        <QuestionText
          qText={examQuestionsJ.findIndex(
            ({ QuestionNumber }) => QuestionNumber === item
          )}
          qDATA={props.sDATA}
        />
      </View>

      <ScrollView>
        <QuestionOptions
          qOption={examQuestionsJ.findIndex(
            ({ QuestionNumber }) => QuestionNumber === item
          )}
          saveOption={saveAnswer}
          qDATA={props.sDATA}
        />
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              goToNextQuestionIfLastSubmitExam();
              handleIsSkip();
            }}
          >
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
