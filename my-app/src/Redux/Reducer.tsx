import { GetQuestions, updateQuestions, InitialState } from "../Types/Types"

const initialState: InitialState = {
    each_question: [],
    question_index: 0,
    currentScore: 0,
    totalScore: 0,
    isAnserSelected: false
};

export default function Questions_Reducer(state = initialState, action: GetQuestions | updateQuestions): InitialState {
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
        default:
            return state;
    }
}