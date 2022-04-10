import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { getQuestion } from "../services/questionService";
import { updateCachedUser } from "../services/localStorageService";
import UserContext from "../context/userContext";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";
import google_search from "../services/questionImageService";
import correctAnswerAudio from "../assets/correct_answer.mp3";
import wrongAnswerAudio from "../assets/wrong_answer.mp3";

const QuizPage = (prop) => {
  const user = useContext(UserContext).data;

  const refUser = useRef({
    name: user.name,
    difficulity: user.difficulty,
    numberOfQuestions: 0,
    numberOfCorrectAnswers: 0,
    numberOfWrongtAnswers: 0,
    totalTimeOfAnswer: 0,
    score: 0,
  });

  const formatQuots = (line) => {
    return line
      .replace(/(&quot;)/g, '"')
      .replace(/(&#039;)/g, "'")
      .replace(/(&amp;)/g, "&")
      .replace(/(&deg;)/g, "°")
      .replace(/(&rsquo;)/g, "'")
      .replace(/(&shy;)/g, "-");
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
  const [timerDuration] = useState(30);
  const [timeToAnswer, setTimeToAnswer] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [is5050clicked, setIs5050clicked] = useState(false);
  const [is5050Disable, setIs5050Disable] = useState(false);
  const [isNextquestionDisable, setIsNextquestionDisable] = useState(false);
  const [playTimer, setPlayTimer] = useState(false);
  const [answerBackground] = useState("#FFFFF");

  const correctAnswerSound = new Audio(correctAnswerAudio);
  const wrongAnswerSound = new Audio(wrongAnswerAudio);

  const playCorrectSound = () => {
    correctAnswerSound.play();
  };

  const playWrongSound = () => {
    wrongAnswerSound.play();
  };

  useEffect(() => {
    const setQuestion = async () => {
      await setFormattedQuestion();
    };
    setQuestion().catch(console.error);
  }, []);

  const setFormattedQuestion = async () => {
    try {
      const [singleQuestion] = await getQuestion(user.difficulity);
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
      try {
        const imgQuestion = await google_search(singleQuestion.question);
        setImgURL(imgQuestion.data.items[0].link);
      } catch (e) {
        setImgURL(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gfpV2QZo6mWSrKbDhMeNE77H0JPLgerqXA&usqp=CAU"
        );
        setIs5050clicked(false);
      }
      setIs5050clicked(false);
      setTimerKey(timerKey + 1);
      setPlayTimer(true);
    } catch (e) {}
  };

  const timesUp = async () => {
    setIsLoading(true);
    wrongAnswerHandler();
    setIsLoading(false);
    await setFormattedQuestion();
  };

  const wrongAnswerHandler = () => {
    playWrongSound();
    refUser.current.numberOfWrongtAnswers += 1;

    setLives(lives - 1);

    if (lives === 1) {
      setIsGameOver(true);
      refUser.current.score = score;
      updateCachedUser({ name: refUser.current.name, score });
      changeUser(refUser.current);

      return;
    }
  };

  const correctAnswerHandler = async () => {
    playCorrectSound();
    refUser.current.numberOfCorrectAnswers += 1;
    setScore(score + (100 - timeToAnswer * 3));
    refUser.current.score = score;
    refUser.current.timeToAnswer = timeToAnswer;
  };

  const onTimerUpdateMethod = async (currentTimerValue) => {
    setTimeToAnswer(timerDuration - currentTimerValue);
  };

  const hearts = useCallback(() => {
    const heartsArray = [];

    for (let i = 1; i <= lives; i++) {
      heartsArray.push(<span key={i}>❤</span>);
    }

    return <div className="hearts">{heartsArray}</div>;
  }, [lives]);

  const checkAnswer = async (answer) => {
    setIsLoading(true);
    setPlayTimer(false);
    refUser.current.numberOfQuestions += 1;
    refUser.current.totalTimeOfAnswer += timeToAnswer;
    const result = answer === correctAnswer;
    if (result) {
      correctAnswerHandler();
    } else {
      wrongAnswerHandler();
    }
    await setFormattedQuestion();
    setIs5050clicked(false);
    setIsLoading(false);
  };
  return (
    <div className="quiz-page">
      {!isGameOver && (
        <div className="page-container">
          <div className="quiz-container">
            <Box className="question">
              <label>{question}</label>
            </Box>
            <img className="question-img" src={imgURL} alt="" />
              <List className="answers">
                {answers.map((answer, index) => {
                  return (
                    <span>
                      <ListItem key={index} className="answer">
                        <button
                          className="answers-btn"
                          background-color={answerBackground}
                          id={answer}
                          disabled={
                            isLoading ||
                            ((answer === wrongAnswers[0] ||
                              answer === wrongAnswers[1]) &&
                              is5050clicked)
                          }
                          key={index}
                          onClick={() => {
                            checkAnswer(answer);
                          }}
                        >
                          {answer}
                        </button>
                      </ListItem>
                    </span>
                  );
                })}
              </List>
          </div>

          <div className="quiz-details">
            <Timer
              key={timerKey}
              duration={timerDuration}
              onUpdateMethod={onTimerUpdateMethod}
              Playing={!isLoading}
              onComplete={() => {
                timesUp();
                return {
                  shouldRepeat: !isLoading,
                  delay: 1,
                };
              }}
            ></Timer>

            <div className="lifeSection">
              <h2 className="lives-title">lives:</h2>
              {hearts()}
            </div>
            <h2 className="score-title">score: {score}</h2>
            <div className="help-btns">
              <button
                className="help-btn"
                disabled={is5050Disable}
                onClick={() => {
                  setIs5050clicked(true);
                  setIs5050Disable(true);
                }}
              >
                50/50
              </button>
              <button
                className="help-btn"
                disabled={isNextquestionDisable}
                onClick={() => {
                  setIsNextquestionDisable(true);
                  setFormattedQuestion();
                }}
              >
                Skip
              </button>
              <div className="endGameButton">
                <button
                  className="end-game-btn"
                  onClick={() => {
                    changeUser(refUser.current.data);
                    updateCachedUser({ name: refUser.current.name, score });
                    setIsGameOver(true);
                    changeUser(refUser.current);
                  }}
                >
                  End game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isGameOver && (
        <div>
          <h1>Game over</h1>
          <div className="to-results-btn">
            <Link to="/gameOver">
              <h2>To results...</h2>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
