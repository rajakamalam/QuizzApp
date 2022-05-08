import { AppShell, Header, Text } from '@mantine/core';
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { InitialState } from "../Types/Types"
import { resetState } from "../Redux/Action"
import './Styles/Summary.css'

export default function Summary() {

    let allQuestions = useSelector((state: InitialState) => state)

    let correctAnswerCount = allQuestions.totalScore / 10
    let incorrectAnswerCount = 10 - correctAnswerCount
    let unansweredQuestionCount = allQuestions.unansweredQuestionCount

    const dispatch = useDispatch()
    let navigate = useNavigate()

    const navigateHome = () => {
        dispatch<any>(resetState(allQuestions))
        navigate(`/`);
    }

    return (
        <div>
            <AppShell padding="lg"
                header={<Header height={60}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', height: '100%', padding: '15px' }}>
                        <Text><h4>Welcome to Quiz Application</h4></Text>
                    </div>
                </Header>}
            //Appshell close
            >
                {
                    <Card className="cardSummary">
                        <ul>
                            <li>
                                <h4>{`Number of correct answers: ${correctAnswerCount}`}</h4> <br></br>
                            </li>
                            <li>
                                <h4>{`Number of incorrect answers: ${incorrectAnswerCount}`}</h4> <br></br>
                            </li>
                            <li>
                                <h4>{`Number of questions unanswered: ${unansweredQuestionCount}`}</h4> <br></br>
                            </li>
                            <li>
                                <h4>{`Total Score: ${allQuestions.totalScore}`}</h4> <br></br>
                            </li>
                        </ul>

                        <button className="home_btn" onClick={() => navigateHome()}>Home</button>
                    </Card>
                }
            </AppShell>
        </div>
    )
}
