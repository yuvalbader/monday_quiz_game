import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Timer(props) {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={props.duration}
      isLinearGradient
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[30, 20, 10, 5]}
      onComplete={props.onComplete}
    >
      {({ remainingTime }) => remainingTime + " sec"}
    </CountdownCircleTimer>
  );
}

export default Timer;
