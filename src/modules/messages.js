import fetch from 'isomorphic-fetch';
//import { routerActions } from 'react-router-redux'
import { baseURL } from '../config'

/* ActionType Constants */
const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';
const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
const POST_MESSAGE_FAILURE = 'POST_MESSAGE_FAILURE';
const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';

/* Action Creator */
export const messagesActions = {
    getMessagesRequest : ()     => ({ type: GET_MESSAGES_REQUEST }),
    getMessagesFailure : (msg)  => ({ type: GET_MESSAGES_FAILURE, errorMessage: msg }),
    getMessagesSuccess : (json) => ({ type: GET_MESSAGES_SUCCESS, data: json }),
    postMessageRequest : ()     => ({ type: POST_MESSAGE_REQUEST }),
    postMessageFailure : (msg)  => ({ type: POST_MESSAGE_FAILURE, errorMessage: msg }),
    postMessageSuccess : ()     => ({ type: POST_MESSAGE_SUCCESS }),
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

messagesActions.postMessage = (message, onAfterCallback) => (dispatch) => {
    dispatch(messagesActions.postMessageRequest());
    const url = `${baseURL}/v1.1/messages`;
    return fetch(url, {
        method: 'POST',
        mode: 'cros',
        headers: {
            Authorization : 'token',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        dispatch(messagesActions.postMessageSuccess());
        if (onAfterCallback) {
            onAfterCallback();
        }
    })
    .catch(error => {
        dispatch(messagesActions.postMessageFailure('メッセージの登録に失敗しました。'));
    });
};


/* Reducers */
const initialState = {
    isFetchingMessages: false,
    isFetchingPostMessage: false,
    didInvalidate:false,
    groupId: 'g001',
    messages: [],
};
export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return Object.assign({}, state, {
                isFetchingMessages: true
            });
        case GET_MESSAGES_FAILURE:
            return Object.assign({}, state, {
                isFetchingMessages: false,
                errorMessage: action.errorMessage
            });
        case GET_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                isFetchingMessages: false,
                messages: action.data
            });
        case POST_MESSAGE_REQUEST :
            return Object.assign({}, state, {
                isFetchingPostMessage: true
            });
        case POST_MESSAGE_FAILURE:
            return Object.assign({}, state, {
                isFetchingPostMessage: false,
                errorMessage: action.errorMessage
            });
        case POST_MESSAGE_SUCCESS:
            return Object.assign({}, state, {
                isFetchingPostMessage: false
            });
        default:
            return state;
    }
}
