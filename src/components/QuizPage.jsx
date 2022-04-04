import React, { useState, useEffect, useContext } from "react";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
 import ListItemIcon from '@material-ui/core/ListItemIcon';
 import FavoriteIcon from '@material-ui/icons/Favorite';
 import {getQuestionImage, getQuestions} from "../services/questionService"
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import CircularStatic from "../components/timer"
import UserContext from "../context/userContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'



const UrgeWithPleasureComponent = () => (
  <CountdownCircleTimer
    isPlaying
    duration={7}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
)

const QuizPage = (prop) => {

const user = useContext(UserContext).data
const [question,setQuestion] = useState([]);
const [answers,setAnswers] = useState([]);
const [correctAnswer,setCorrectAnswer] = useState([]);
const [lives,setLives] = useState(5);
const [score,setScore] = useState(0);
const [isLoading,setIsLoading] = useState(false);
const [time,setTime] = useState(0);
const [isGameOver,setIsGameOver] = useState(false);
const [quastionImgURL,setquastionImgURL] = useState('');



useEffect(() => {
        const setQuestion = async () => {
        await setFormattedQuestion();
    }
    setQuestion()
        .catch(console.error);

}, [])


const setFormattedQuestion = async () => {
    const [singleQuestion] = await getQuestions();
    // setquastionImgURL(await getQuestionImage())
    console.log(quastionImgURL)
    const formattedSingleQuestion = [...singleQuestion.incorrect_answers,singleQuestion.correct_answer]
    const shuffledQuestion = formattedSingleQuestion
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    setAnswers(shuffledQuestion)
    setQuestion(singleQuestion.question)
    setCorrectAnswer(singleQuestion.correct_answer)
    console.log(singleQuestion.correct_answer)
}

const wrongAnswerOrTimeIsUpHandler = async ()=>{
setLives(lives-1)

    if(lives === 1)
    { setIsGameOver(true)
        return;
        }
    await setFormattedQuestion();
}

const correctAnswerHandler = async ()=>{
setScore(score +1)
    await setFormattedQuestion();
}


const setNextQuestion = async ()=>{
}

const checkAnswer = async (answer) => {
    setIsLoading(true)
    const result = answer === correctAnswer;
    result ? correctAnswerHandler():wrongAnswerOrTimeIsUpHandler() 
    setIsLoading(false)
}
    return (
        <div>
            {!isGameOver && <div> <Box className="Quastion Box" display="flex" 
        width={500} height={200} 
        bgcolor="blue"
        justifyContent="center">  
           <label> {question} </label>
        </Box>
            <Box className="Answers Box" display="flex" 
        width={500} height={250} 
        bgcolor="lightblue"
        justifyContent="center">

<image src = {quastionImgURL}> </image>
<List  component="nav" aria-label="mailbox folders">
    {
        answers.map((answer,index)=>{
            return <ListItem > <Button disabled={isLoading} key={index} variant="contained" color="primary" onClick={()=>checkAnswer(answer)}>{answer}</Button>  </ListItem >
        })
    }
</List>
        </Box>
            <h2>lives:{lives}</h2>
            <h2>score:{score}</h2>
        <Button variant="contained" color="primary" onClick={() => { alert("50/50 clicked") }}>50/50</Button>
        <Button variant="contained" color="primary" onClick={() => { alert("Next Quastion clicked") }}>Next quastion</Button>

         <CountdownCircleTimer
    isPlaying
    duration={4}
    isLinearGradient
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[4]}
    onComplete={() => {
    wrongAnswerOrTimeIsUpHandler()
      return { shouldRepeat: !isLoading, delay: 1 } 
    }}
  >
    {({ remainingTime }) => "you can do it in "+ remainingTime +" sec"}
  </CountdownCircleTimer>

      </div> 
      }

{isGameOver && <div>
                <Link to="/gameOver" ><Button variant="contained" color="primary">Show results</Button>  </Link>

</div>
       
      }

       </div>
)
}

export default QuizPage; 