import React from 'react';
import {  ButtonWrapper } from './QuestionCard.styles';

type Props ={
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNum: number;
    totalQuestions: number;
}

export const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNum, totalQuestions}) => {


    return (
        <div>
            <p>Question Number: <strong> {questionNum} / {totalQuestions}</strong></p>
            <strong><p  dangerouslySetInnerHTML={{__html: question}} /></strong>

            <div>
                {
                    answers.map( ans => {
                        return(
                            <ButtonWrapper
                            correct = {userAnswer?.correctAnswer === ans}
                            userClicked = { userAnswer?.answer === ans }
                        >
                            <button onClick={callback} value={ans} disabled={userAnswer} className='btn'>
                            <span dangerouslySetInnerHTML={{__html: ans}} />
                            </button>
                            </ButtonWrapper>
                        )
                    })
                }
            </div>
        </div>
    )
}
