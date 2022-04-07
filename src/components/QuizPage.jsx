import React, { useState, useEffect, useContext, useRef } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { getQuestion } from "../services/questionService";
import UserContext from "../context/userContext";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";
//import google_search from "../services/questionImageService";

const QuizPage = (prop) => {
  const user = useContext(UserContext).data;
  const refUser = useRef({
    name: user.name,
    numberOfQuestions: 0,
    numberOfCorrectAnswers: 0,
    numberOfWrongtAnswers: 0,
    totalTimeOfAnswer: 0,
    score: 0,
  });

  const formatQuots = (question) => {
    return question
      .replace(/(&quot\;)/g, '"')
      .replace(/(&#039\;)/g, "'")
      .replace(/(&amp\;)/g, "&")
      .replace(/(&deg\;)/g, "°")
      .replace(/(&rsquo\;)/g, "'")
      .replace(/(&shy\;)/g, "-");
  };
  const changeUser = useContext(UserContext).changeUser;

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [timerDuration, setTimerDuration] = useState(30);
  const [timeToAnswer, setTimeToAnswer] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [is5050clicked, setIs5050clicked] = useState(false);
  const [is5050Disable, setIs5050Disable] = useState(false);
  const [isNextquestionDisable, setIsNextquestionDisable] = useState(false);

  useEffect(() => {
    const setQuestion = async () => {
      await setFormattedQuestion();
    };
    setQuestion().catch(console.error);
  }, []);

  const setFormattedQuestion = async () => {
    const [singleQuestion] = await getQuestion();
    console.log("Fetch question");
    console.log(refUser);
    console.log("Fetch question");

    const formattedSingleQuestion = [
      ...singleQuestion.incorrect_answers,
      singleQuestion.correct_answer,
    ];
    const shuffledQuestion = formattedSingleQuestion
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => formatQuots(value));
    setAnswers(shuffledQuestion);
    const formattedQuestion = formatQuots(singleQuestion.question);

    setQuestion(formattedQuestion);
    setCorrectAnswer(singleQuestion.correct_answer);
    setWrongAnswers(singleQuestion.incorrect_answers);

    // const imgQuestion = await google_search(singleQuestion.question);
    // console.log(imgQuestion);
    // const url = imgQuestion.data.items[0].link ;
    // setImgURL(url);
    // console.log(imgURL);
    console.log(singleQuestion.correct_answer);
    setTimerKey(timerKey + 1);
  };
  const timesUp = async () => {
    setIsLoading(true);
    wrongAnswer();
    setIsLoading(false);
    await setFormattedQuestion();
  };
  const wrongAnswer = () => {
    refUser.current.numberOfWrongtAnswers += 1;
    console.log("wrong answer");
    console.log(refUser);
    setLives(lives - 1);
    if (lives === 1) {
      setIsGameOver(true);
      changeUser(refUser);

      return;
    }
  };

  const correctAnswerHandler = async () => {
    refUser.current.numberOfCorrectAnswers += 1;
    console.log("correct answer");
    console.log(refUser);
    setScore(score + 1);
  };

  const checkAnswer = async (answer) => {
    setIsLoading(true);
    refUser.current.numberOfQuestions += 1;
    refUser.current.totalTimeOfAnswer += timeToAnswer;

    const result = answer === correctAnswer;
    if (result) {
      correctAnswerHandler();
    } else {
      wrongAnswer();
    }
    await setFormattedQuestion();
    setIs5050clicked(false);
    setIsLoading(false);
  };
  return (
    <div class="quiz-page">
      {!isGameOver && (
        <div class="page-container">
          <div class="quiz-container">
            <Box class="question">
              <label>{question}</label>
            </Box>
            <img
              class="question-img"
              src="https://www.monday.com/blog/wp-content/uploads/2018/02/22852120_1266763086768693_6004893502123596052_n.png"
            />
            <List class="answers">
              {answers.map((answer, index) => {
                return (
                  <ListItem class="answer">
                    <Button
                      id={answer}
                      disabled={
                        isLoading ||
                        ((answer === wrongAnswers[0] ||
                          answer === wrongAnswers[1]) &&
                          is5050clicked)
                      }
                      key={index}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        checkAnswer(answer);
                      }}
                    >
                      {answer}
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <div class="quiz-details">
            <h2 class="lives-title">lives:{lives}</h2>
            <h2 class="score-title">score:{score}</h2>
            <div class="help-btns">
              <Button
                variant="contained"
                color="primary"
                disabled={is5050Disable}
                onClick={() => {
                  setIs5050clicked(true);
                  setIs5050Disable(true);
                }}
              >
                50/50
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isNextquestionDisable}
                onClick={() => {
                  setIsNextquestionDisable(true);
                  setFormattedQuestion();
                }}
              >
                Next question
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsGameOver(true);
                  changeUser(refUser);
                }}
              >
                End game{" "}
              </Button>
            </div>
            <Timer
              key={timerKey}
              duration={timerDuration}
              // onComplete={() => {
              //   // refUser.totalTimeOfAnswer += remainingTime
              //   timesUp();
              //   return {
              //     shouldRepeat: !isLoading,
              //     delay: 1,
              //};
              //}}
            >
              {({ remainingTime }) => {
                //setTimeToAnswer(timerDuration - remainingTime);
              }}
            </Timer>
          </div>
        </div>
      )}
      {isGameOver && (
        <div>
          <Link to="/gameOver">
            <Button>to results </Button>{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
