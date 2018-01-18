// Reducer
import { combineReducers } from "redux";
import { routerReducer }   from 'react-router-redux'
import { loginReducer }    from './login'
import { messagesReducer } from './messages'

export const rootReducer = combineReducers({
    auth: loginReducer,
    messages: messagesReducer,
    routing: routerReducer
});
