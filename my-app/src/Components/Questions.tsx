import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from "react";
import { AppShell, Header, Text } from '@mantine/core';
import Card from "react-bootstrap/Card";
import { useState } from "react"

import './Styles/Questions.css'
import { fetchQuestions, updateStateValues } from "../Redux/Action"
import { InitialState } from "../Types/Types"

export default function Home() {
    // localStorage.clear()
    const dispatch = useDispatch()

    //Get all question on load:
    const allQuestions = useSelector((state: InitialState) => state)
    if (allQuestions.each_question.length === 0) {
        dispatch<any>(fetchQuestions())
    }

    // console.log(allQuestions)

    //useEffect(() => {
    // console.log("Use effect")
    // dispatch<any>(fetchQuestions());
    //}, [dispatch])

    //Get current question index
    let question_index = allQuestions.question_index
    let answer = ""
    let score = allQuestions.totalScore

    const [disableOptions, setDisableOptions] = useState(false);

    //On click of an option
    const handleOptionsClick = (e: any) => {
        // console.log(e.target.textContent)
        answer = allQuestions.each_question[question_index].correct_answer
        if (e.target.textContent === answer) {
            score = score + 1
        }
        console.log(score)
        allQuestions.totalScore = score
        allQuestions.isAnserSelected = true
        setDisableOptions(allQuestions.isAnserSelected)
        dispatch<any>(updateStateValues(allQuestions))
        console.log(allQuestions)
    }

    // On Next button clicked, go to the next question.
    const onNextClicked = () => {
        allQuestions.question_index = question_index + 1
        allQuestions.isAnserSelected = false
        setDisableOptions(allQuestions.isAnserSelected)
        dispatch<any>(updateStateValues(allQuestions))
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
                        Lifeline 1: <button className="Lifeline_btn">Add 10 seconds</button> <br></br><br></br>
                        Lifeline 2: <button className="Lifeline_btn">50/50</button> <br></br>
                    </div>

                    <Card className="cardBody">
                        <p style={{ display: 'flex', alignItems: 'left' }}>{`Question :  ${question_index + 1}`}</p>

                        <p style={{ display: 'flex', alignItems: 'left' }}>{allQuestions.each_question[question_index].question.toString()}</p>
                        {
                            allQuestions.each_question[question_index].options.map((each_option) => (
                                <ul style={{ display: 'flex', alignItems: 'left' }}>
                                    <li style={{ display: 'flex', alignItems: 'left' }}>
                                        <button className="Option_btn" disabled={disableOptions} onClick={handleOptionsClick}>
                                            {each_option}
                                        </button>
                                    </li>
                                    <br></br>
                                </ul>
                            ))
                        }
                        <br></br>
                        <button className="Next_btn" onClick={onNextClicked}>Next</button>
                        <div style={{ display: 'flex', alignItems: 'left', fontWeight: 'bold' }}>
                            Score: {allQuestions.totalScore}
                        </div>

                    </Card>
                </div>
            }
        </AppShell >
    )
}
