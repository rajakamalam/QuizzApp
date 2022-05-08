export type Question = {
    question: string,
    correct_answer: string,
    options: Array<string>
}
export type InitialState = {
    each_question: Question[],
    question_index: number,
    currentScore: number,
    totalScore: number,
    isAnserSelected: boolean
}

//1. Load all questions:
export type GetQuestions = {
    type: "GET_QUESTIONS",
    payload: Question[],
}
//2. Reload questions:
export type updateQuestions = {
    type: "UPDATE_QUESTIONS",
    payload: InitialState,
}