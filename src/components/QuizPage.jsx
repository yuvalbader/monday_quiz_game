import React, { useState, useEffect, useContext } from "react";
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
 import {getQuestion} from "../services/questionService"
import UserContext from "../context/userContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {Img} from 'react-image'
import { getQuestionImage } from "../services/questionImageService";
import Timer from "../components/Timer"
import google_search from "../services/questionImageService";


const QuizPage = (prop) => {

const user = useContext(UserContext).data
const [question,setQuestion] = useState([]);
const [answers,setAnswers] = useState([]);
const [correctAnswer,setCorrectAnswer] = useState([]);
const [wrongAnswers,setWrongAnswers] = useState([]);
const [lives,setLives] = useState(5);
const [score,setScore] = useState(0);
const [isLoading,setIsLoading] = useState(false);
const [time,setTime] = useState(0);
const [isGameOver,setIsGameOver] = useState(false);
const [quastionImgURL,setquastionImgURL] = useState('');
const [imgURL,setImgURL] = useState('');
const [timerDuration,setTimerDuration] = useState(30);
const [timerKey,setTimerKey] = useState(0);
const [is5050clicked,setIs5050clicked] = useState(false);
const [is5050Disable,setIs5050Disable] = useState(false);
const [isNextQuastionDisable,setIsNextQuastionDisable] = useState(false);


useEffect(() => {
        const setQuestion = async () => {
        await setFormattedQuestion();
    }
    setQuestion()
        .catch(console.error);
}, [])

const setFormattedQuestion = async () => {
    const [singleQuestion] = await getQuestion();
    const imgQuestion = await google_search('towel warmer');
    console.log(imgQuestion);

    console.log(imgQuestion.data.items[0].link);
    const formattedSingleQuestion = [...singleQuestion.incorrect_answers,singleQuestion.correct_answer]
    const shuffledQuestion = formattedSingleQuestion
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    setAnswers(shuffledQuestion)
    setQuestion(singleQuestion.question)
    setCorrectAnswer(singleQuestion.correct_answer)
    setWrongAnswers(singleQuestion.incorrect_answers)
    console.log(singleQuestion.correct_answer)
}

// const setQuastionImg = async ()=>{
// //const response = await getQuestionImage();
// console.log(response)    
// }
const timesUp = async ()=>{
    setIsLoading(true)
    wrongAnswer();
    setIsLoading(false)
    await setFormattedQuestion();
}
const wrongAnswer = ()=>{
    setLives(lives-1)
    if(lives === 1)
    {
        setIsGameOver(true)
        return;
    }
}

const correctAnswerHandler = async ()=>{
    setScore(score +1)
}

const click5050Handler = ()=> {    
    const correctAnswerButton = document.getElementById(correctAnswer);
    //const wrongAnswerButton = document.getElementById(wrongAnswers)
    
   // const wrongRandomAnswer = document.getElementById({wrongAnswers})
console.log("correct========== " + correctAnswerButton)
}

const checkAnswer = async (answer) => {
    setIsLoading(true)
    setTimerKey(timerKey+1)
    const result = answer === correctAnswer;
    if(result){
        correctAnswerHandler()
    } else {
        wrongAnswer() 
    }
    await setFormattedQuestion();
    setIs5050clicked(false)
    
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

<Img src = {quastionImgURL}> </Img>
<List  id= "Answers List"component="nav" aria-label="mailbox folders">
    {
        answers.map((answer,index)=>{
            return <ListItem > <Button id = {answer} disabled={isLoading || ((answer === wrongAnswers[0] || answer === wrongAnswers[1])&& is5050clicked) } key={index} variant="contained" color="primary" onClick={()=>checkAnswer(answer)}>{answer}</Button>  </ListItem >
        })
    }
</List>
        </Box>
            <h2>lives:{lives}</h2>
            <h2>score:{score}</h2>
        <Button variant="contained" color="primary" disabled={is5050Disable} onClick={() => {setIs5050clicked(true); setIs5050Disable(true) }}>50/50</Button>
        <Button variant="contained" color="primary" disabled={isNextQuastionDisable} onClick={() => { setIsNextQuastionDisable(true); setFormattedQuestion() }}>Next quastion</Button>
         <Timer key = {timerKey} remainingTime={timerDuration} duration={timerDuration} onComplete={() => {
                                     timesUp()
      return { shouldRepeat: !isLoading, delay: 1 } 
    }} > </Timer>
      </div> 
      }
{  isGameOver && <div>
                <Link to="/gameOver" ><div> </div>  </Link>

</div>
       
      }

       </div>
)
}

export default QuizPage; 