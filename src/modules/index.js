// Reducer
import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'
import { loginReducer } from './login'

const initialState = { value: 0 }
const reducerA = (state = initialState, action) => {
    // Componentの中でディスパッチされたActionがaction変数に入ってくる
    // action = { type: "INCREMENT" }
    console.info(state);
    switch (action.type) {
        case "INCREMENT":
            // valueに+1して返す
            return Object.assign({}, { value: state.value + 1 });
        default:
            return state;
    }
}
const reducerB = (state = initialState, action) => {
    // Componentの中でディスパッチされたActionがaction変数に入ってくる
    // action = { type: "INCREMENT" }
    switch (action.type) {
        case "INCREMENT":
            // valueに+1して返す
            return Object.assign({}, { value: state.value + 2 });
        default:
            return state;
    }
}


export const rootReducer = combineReducers({
    reducerA,
    reducerB,
    auth: loginReducer,
    routing: routerReducer
});
