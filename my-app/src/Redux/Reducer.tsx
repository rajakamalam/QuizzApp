import { GetQuestions, updateQuestions, ResetState, InitialState } from "../Types/Types"

const initialState: InitialState = {
    each_question: [{
        "question": "What was the name of the spy ring that helped the United States win the Revolutionary War?",
        "options": [
            "Culper Ring",
            "New York Spy Ring",
            "Washington&#039;s Spies",
            "Unnamed"
        ],
        "correct_answer": "Culper Ring",
    }],
    question_index: 1,
    currentScore: 0,
    totalScore: 0,
    isAnswerSelected: false,
    isLifeline1Used: false,
    isLifeline2Used: false,
    unansweredQuestionCount: 0
};

export default function Questions_Reducer(state = initialState, action: GetQuestions | updateQuestions | ResetState): InitialState {
    switch (action.type) {
        case "GET_QUESTIONS": {
            // console.log("Reducer:")
            // console.log(action.payload)
            return {
                ...state,
                each_question: action.payload,
            };
        }
        case "UPDATE_QUESTIONS": {
            return state;
        }
        case "RESET_QUESTIONS": {
            return initialState
        }
        default:
            return state;
    }
}