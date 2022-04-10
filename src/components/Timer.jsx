import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Timer(props) {
  return (
    <div className="timer">
      <CountdownCircleTimer
        duration={props.duration}
        isLinearGradient
        colors={["#34a832", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[30, 20, 10, 5]}
        onComplete={props.onComplete}
        onUpdate={(remainingTime) => props.onUpdateMethod(remainingTime)}
        isPlaying={props.Playing}
      >
        {({ remainingTime }) => remainingTime + " Seconds"}
      </CountdownCircleTimer>
    </div>
  );
}

export default Timer;
