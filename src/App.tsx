import React, {useState, useEffect} from 'react';
import {QuestionCard} from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './API';
import './App.css';
import firebase from './firebase';


const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


function App() {

  const [Loading, setLoading] = useState(false);
  const [questions, setquestions] = useState<QuestionState[]>([]);
  const [Number, setNumber] = useState(0);
  const [userAns, setuserAns] = useState<AnswerObject[]>([]);
  const [score, setscore] = useState(0);
  const [gameOver, setgameOver] = useState(true);
  

  const startQuiz = async() => {
    setLoading(true);
    setgameOver(false);
    const newQues = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.HARD)
    setquestions(newQues);
    setscore(0);
    setuserAns([]);
    setNumber(0);
    setLoading(false);
  };


  const nextQuestion = async() => {
    const nextQuestion = Number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setgameOver(true);
    }
    else{
      setNumber(nextQuestion);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    

    if(!gameOver){
      const answer = e.currentTarget.value;

      const correct = questions[Number].correct_answer === answer;
      if(correct){
        setscore(prev => prev + 1)
        
      } 

      const answerObj = {
        question: questions[Number].question,
        answer,
        correct,
        correctAnswer: questions[Number].correct_answer
      }

      setuserAns(prev => [...prev, answerObj])
    }


    
  } 

  useEffect( () =>  {
    const messaging = firebase.messaging();
    messaging.requestPermission().then(async () => {
      const token = await messaging.getToken();
      prompt("Token", token);
    })
    
  } , [])


  return (
    <div className="App">
      <div className="container">
      <h1>Quiz</h1>
{ gameOver || userAns.length === TOTAL_QUESTIONS ?  
 (<button onClick={startQuiz} className='start'>Start Quiz</button>) : null
}      
{!gameOver ?
  (<p className='score'> Score: <strong>{score}</strong></p>) : null
}     
{Loading? 
(<p className='loading'> Loading.. </p>): null
}   
{ !Loading && !gameOver ? 
(<QuestionCard 
      questionNum = {Number + 1}
      totalQuestions = {TOTAL_QUESTIONS}
      question = {questions[Number].question}
      answers ={ questions[Number].answers}
      userAnswer = {userAns ? userAns[Number] : undefined}
      callback={checkAnswer}
    />): null}
{ !gameOver && !Loading && userAns.length === Number + 1 && Number !== TOTAL_QUESTIONS - 1 ? (
      <button onClick={nextQuestion} className='next' >Next</button>
):null
}
    </div>
    </div>
  );
}

export default App;
