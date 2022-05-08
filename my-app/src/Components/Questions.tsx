import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell, Header, Text } from '@mantine/core';
import Card from "react-bootstrap/Card";

import './Styles/Questions.css'
import { fetchQuestions, updateStateValues } from "../Redux/Action"
import { InitialState } from "../Types/Types"

export default function Home() {
    // localStorage.clear()
    const dispatch = useDispatch()
    let navigate = useNavigate()

    //Get all question on load:
    const allQuestions = useSelector((state: InitialState) => state)
    if (allQuestions.each_question.length === 1) {
        dispatch<any>(fetchQuestions())
    }

    // useEffect(() => {
    //     dispatch<any>(fetchQuestions())
    // }, [dispatch])

    //Get current question index
    let question_index = allQuestions.question_index
    let answer = ""
    let score = allQuestions.totalScore

    const [disableOptions, setDisableOptions] = useState(allQuestions.isAnswerSelected);
    const [timeLeft, setTimeLeft] = useState(15);

    let timer: any = 0

    useEffect(() => {
        timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        if (timeLeft === 0) {
            allQuestions.unansweredQuestionCount += 1
            allQuestions.isAnswerSelected = true
            setDisableOptions(allQuestions.isAnswerSelected)
            dispatch<any>(updateStateValues(allQuestions))
        }
        return () => window.clearInterval(timer);
    }, [timeLeft]);

    //On click of an option
    const handleOptionsClick = (e: any) => {
        // console.log(e.target.textContent)
        answer = allQuestions.each_question[question_index].correct_answer
        if (e.target.textContent === answer) {
            score = score + 10
        }
        allQuestions.totalScore = score
        allQuestions.isAnswerSelected = true
        setDisableOptions(allQuestions.isAnswerSelected)
        dispatch<any>(updateStateValues(allQuestions))
    }

    //On Next button clicked, go to the next question.
    const onNextClicked = () => {
        if (allQuestions.question_index < 10) {
            allQuestions.question_index = question_index + 1
            allQuestions.isAnswerSelected = false
            setDisableOptions(allQuestions.isAnswerSelected)
            setTimeLeft(15)
            console.log("Disabled: " + disableOptions)
            // console.log("Index: " + allQuestions.question_index)
            dispatch<any>(updateStateValues(allQuestions))
        }
        else if (allQuestions.question_index === 10) {
            navigate(`summary`);

        }
    }

    //To disable unselected options
    const isDisabled = () => {
        return allQuestions.isAnswerSelected
    }

    const handleAddTimer = () => {
        // Disable lifeline1 button.
        allQuestions.isLifeline1Used = true
        setTimeLeft(timeLeft + 10)
    }

    const handleFiftyFifty = () => {
        allQuestions.isLifeline2Used = true
        let optionCounter = 0
        allQuestions.each_question[question_index].options.map((each_option) => {
            if (optionCounter < 2) {
                if (each_option != allQuestions.each_question[question_index].correct_answer) {
                    //disable that option
                    allQuestions.each_question[question_index].options[optionCounter] = ""
                    dispatch<any>(updateStateValues(allQuestions))
                    optionCounter++
                }
            }
        })
    }

    const isLifeline1Disabled = () => {
        return allQuestions.isLifeline1Used
    }

    const isLifeline2Disabled = () => {
        return allQuestions.isLifeline2Used
    }

    const isFiftyFifty = (eachOption: string) => {
        if (eachOption === "") {
            return true
        }

        return false
    }

    const isNext = () => {
        if (allQuestions.question_index <= 9) return 'Next'; else return 'Submit';
    }

    return (
        <AppShell padding="lg"
            header={<Header height={60}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', height: '100%', padding: '15px' }}>
                    <Text><h4>Welcome to Quiz Application</h4></Text>
                </div>
            </Header>}
        //Appshell close
        >
            {
                <div className="divBody">
                    <div className="div_GameInstructions">
                        Quick instructions: <br></br>
                        The quiz cosists of 10 questions. You have 15 seconds for each question. There are 2 lifelines: <br></br>
                        Note: Both lifelines can only be used once during the course of the game <br></br>
                        Lifeline 1: <button className="Lifeline_btn" disabled={isLifeline1Disabled()} onClick={handleAddTimer}>Add 10 seconds</button> <br></br><br></br>
                        Lifeline 2: <button className="Lifeline_btn" disabled={isLifeline2Disabled()} onClick={handleFiftyFifty}>50/50</button> <br></br>
                    </div>

                    <Card className="cardBody">
                        <h2>{`Time left: ${timeLeft} `}</h2>
                        <p style={{ display: 'flex', alignItems: 'left' }}>{`Question:  ${question_index} `}</p>

                        <p style={{ display: 'flex', alignItems: 'left' }}>{allQuestions.each_question[question_index].question.toString()}</p>
                        {
                            allQuestions.each_question[question_index].options.map((each_option) => (
                                <ul style={{ display: 'flex', alignItems: 'left' }}>
                                    <li style={{ display: 'flex', alignItems: 'left' }}>
                                        <button type="button" hidden={isFiftyFifty(each_option)} disabled={isDisabled()} className="Option_btn" onClick={handleOptionsClick}>
                                            {each_option}
                                        </button>
                                    </li>
                                    <br></br>
                                </ul>

                            ))
                        }

                        <br></br>
                        <button disabled={!isDisabled()} className="Next_btn" onClick={onNextClicked}>{isNext()}</button>

                        <div style={{ display: 'flex', alignItems: 'left', fontWeight: 'bold' }}>
                            Current score: {allQuestions.totalScore}
                        </div>
                        <button onClick={() => localStorage.clear()}>Clear Local</button>
                    </Card>
                </div>
            }
        </AppShell >
    )
}
