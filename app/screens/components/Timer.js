import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Timer(props) {
  const examDuration = 602; //total duration of exam  in seconds
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [timerCount, setTimerCount] = useState(examDuration);
  

  useEffect(() => {
    let interval = setInterval(() => {
      setTimerCount((lastTimerCount) => {
        lastTimerCount <= 0 && clearInterval(interval);
        console.log(lastTimerCount);
        if (lastTimerCount === 3600 || lastTimerCount===1800 || lastTimerCount===600) {
          setIsTimerVisible(true);
        }
        if (lastTimerCount === 3600 || lastTimerCount===1800 || lastTimerCount===595) {
          setIsTimerVisible(false);
        }

        if (lastTimerCount === 0) {
          alert("Your time is up. The exam will be submitted.");
          setIsTimerVisible(false);
        }
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timerCount]);

  
  function secondsToHms(time) {
    var h = Math.floor(time / 3600);
    var m = Math.floor((time % 3600) / 60);
    var s = Math.floor((time % 3600) % 60);
    return [h, m, s];
  }

  function displayTimeAlerts(h, m, s) {
    if (h > 0) {
      var alert = h + (h === 1 ? " hour" : " hours");
    } else {
      alert = m + " minutes";
    }

    return alert;
  }

  function displayTimer(h, m, s) {
    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 9 ? m + ":" : "0" + m + ":";
    var sDisplay = s > 9 ? s : "0" + s;
    return hDisplay + mDisplay + sDisplay;
  }

  function handleToggle() {
    setIsTimerVisible(!isTimerVisible);
  }

  return (
    <View>
      <TouchableOpacity onPress={handleToggle}>
        <Text style={{ fontWeight: "bold" }}>
          {isTimerVisible
            ? "Time left: " + displayTimer(
                secondsToHms(timerCount)[0],
                secondsToHms(timerCount)[1],
                secondsToHms(timerCount)[2]
              )
            : "🕒 Timer"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
