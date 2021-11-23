import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity} from "react-native"

export default function Timer(props) {
    const [isTimerVisible, setIsTimerVisible] = useState(false)
    const [timerCount, setTimerCount] = useState(7200)
    
    useEffect(() => {
        let interval = setInterval(()=> {
            setTimerCount (lastTimerCount=> {lastTimerCount<=1 && clearInterval (interval)
            
                return lastTimerCount -1
        })
    },1000)
    return () => {clearInterval(interval)}},[]);
    
    function secondsToHms(time) {
        
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 3600 % 60);
    
        var hDisplay = h > 0 ? h + ":" : "";
        var mDisplay = m > 0 ? m + ":": "";
        var sDisplay = s > 0 ? s : "";
        return hDisplay + mDisplay + sDisplay; 
    }

    function handleToggle() {
        setIsTimerVisible(!isTimerVisible)}
    
    


return <View><TouchableOpacity onPress={handleToggle}><Text style={{fontWeight:"bold"}}>{isTimerVisible ? secondsToHms(timerCount) : "🕒 Timer"}</Text></TouchableOpacity></View>;

};
