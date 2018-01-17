import fetch from 'isomorphic-fetch';
import { routerActions } from 'react-router-redux'
import { baseURL } from '../config'

/* ActionType Constants */
const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';
const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';

/* Action Creator */
export const messagesActions = {
    getMessagesRequest : ()     => ({ type: GET_MESSAGES_REQUEST }),
    getMessagesFailure : (msg)  => ({ type: GET_MESSAGES_FAILURE, errorMessage: msg }),
    getMessagesSuccess : (json) => ({ type: GET_MESSAGES_SUCCESS, data: json }),
}


messagesActions.getMessages = () => (dispatch) => {
    dispatch(messagesActions.getMessagesRequest());
    const url = `${baseURL}/v1.1/messages`;
    return fetch(url, {
        method: 'GET',
        mode: 'cros',
        headers: {
            Authorization : 'token',
        }
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        dispatch(messagesActions.getMessagesSuccess(json));
    })
    .catch(error => {
        dispatch(messagesActions.getMessagesFailure('メッセージの取得に失敗しました。'));
    });
};


/* Reducers */
const initialState = {
    isFetching: false,
    didInvalidate:false,
    messages: [],
};
export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return Object.assign({}, initialState, {
                isFetching: true
            });
        case GET_MESSAGES_FAILURE:
            return Object.assign({}, initialState, {
                isFetching: false,
                errorMessage: action.errorMessage
            });
        case GET_MESSAGES_SUCCESS:
            return Object.assign({}, initialState, {
                isFetching: false,
                messages: action.data
            });
        default:
            return state;
    }
}
