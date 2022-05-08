import { Dispatch } from "redux";

import data from '../questions.json';
import { GetQuestions, InitialState, Question, ResetState } from '../Types/Types';

//1. Get questions on load
export function getQuestions(questions: Question[]): GetQuestions {
    // console.log("Action:")
    // console.log(questions)
    return {
        type: "GET_QUESTIONS",
        payload: questions,
    };
}
export function updateQuestions(updateState: InitialState) {
    return {
        type: "UPDATE_QUESTIONS",
        payload: updateState,
    };
}
export function resetState(allData: InitialState): ResetState {
    return {
        type: "RESET_QUESTIONS",
        payload: allData,
    };
}

export function fetchQuestions() {
    return async (dispatch: Dispatch) => {
        // console.log("Fetch questions")
        // console.log(data)
        dispatch(getQuestions(data))
    };
}

export function updateStateValues(question: InitialState) {
    return async (dispatch: Dispatch) => {
        dispatch(updateQuestions(question))
    }
}

export function clearStateData(allData: InitialState) {
    return async (dispatch: Dispatch) => {
        dispatch(resetState(allData))
    }
}
