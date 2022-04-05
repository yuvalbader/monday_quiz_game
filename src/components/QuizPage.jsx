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
const [imgURL,setImgURL] = useState('');
const [timerDuration,setTimerDuration] = useState(30);
const [timerKey,setTimerKey] = useState(0);



useEffect(() => {
        const setQuestion = async () => {
        await setFormattedQuestion();
    }
    setQuestion()
        .catch(console.error);
}, [])


const setFormattedQuestion = async () => {
    const [singleQuestion] = await getQuestion();
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

const setQuastionImg = async ()=>{
const response = await getQuestionImage();
// setImgURL(imgURL)
console.log(response)
}
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
    const answersList = document.getElementById("Answers List")
    console.log(answersList)

}


const setNextQuestion = async ()=>{
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
            return <ListItem > <Button className = {answer} disabled={isLoading} key={index} variant="contained" color="primary" onClick={()=>checkAnswer(answer)}>{answer}</Button>  </ListItem >
        })
    }
</List>
        </Box>
            <h2>lives:{lives}</h2>
            <h2>score:{score}</h2>
        <Button variant="contained" color="primary" onClick={() => { click5050Handler() }}>50/50</Button>
        <Button variant="contained" color="primary" onClick={() => { alert("Next Quastion clicked") }}>Next quastion</Button>
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