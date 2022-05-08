import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { InitialState } from "../Types/Types";

import Questions_Reducer from "./Reducer";

function saveToLocalStorage(state: InitialState) {
    const localStorageState = JSON.stringify(state);
    localStorage.setItem("state", localStorageState);
}

function loadFromLocalStorage() {
    const localStorageState = localStorage.getItem("state");
    if (localStorageState === null) return undefined;
    return JSON.parse(localStorageState);
}

//Redux store with middleware
const storeFactory = () => {
    const middleware = [thunk];
    const reduxStore = createStore(
        Questions_Reducer,
        loadFromLocalStorage(),
        applyMiddleware(...middleware)
    );
    reduxStore.subscribe(() => saveToLocalStorage(reduxStore.getState()));
    return reduxStore;
}

export default storeFactory