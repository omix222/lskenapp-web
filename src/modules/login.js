import fetch from 'isomorphic-fetch';
import { routerActions } from 'react-router-redux'

/* ActionType Constants */
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

/* Action Creator */
export const loginRequest = (loginId) => ({
    type: LOGIN_REQUEST,
    loginId: loginId
});
const loginFailure = (msg) => ({
    type: LOGIN_FAILURE,
    errorMessage: msg
});
const loginSuccess = (loginId, json) => ({
    type: LOGIN_SUCCESS,
    data: json
});

/* Reducers */
const initialState = {
    isFetching: false,
    didInvalidate:false,
    errorMessage: '',
};
export const loginReducer = (state = initialState, action) => {
    console.info("reducer:auth");
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, initialState, {
                isFetching: true
            });
        case LOGIN_FAILURE:
            return Object.assign({}, initialState, {
                isFetching: false,
                errorMessage: action.errorMessage
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, initialState, {
                isFetching: false,
                data: action.data
            });
        default:
            return state;
    }
}

export function execLogin(userId) {
    // Thunkミドルウェアは関数をどのように扱うかわかっている。
    // dispatchメソッドの引数をそのまま関数に渡し、
    // その結果、action自体を実行できるようにする。

    return function (dispatch) {

        // 最初のdispatch: API呼び出しが開始されたと知らせるため、アプリケーションの状態は更新される。
        if (userId.length == 0) {
            dispatch(loginFailure("ユーザIDを入力してください。"));
            return undefined;
        }
        dispatch(loginRequest(userId));

        // Thunkミドルウェアから呼び出された関数は、dispatchメソッドのreturn値として値をreturnできる。

        // この例では、実行を待たせるためpromiseを返している。
        // Thunkミドルウェアは必須ではないが、便利なので使っている。
        return fetch(`http://localhost:8080/lskenapp/api/v1.0/users/${userId}`, {
            mode: 'cros'
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            // 何度でもdispatchできる。
            // API呼び出しの結果としてアプリケーションの状態が更新される。
            if (json.userName) {
                dispatch(loginSuccess(userId, json));
                dispatch(routerActions.push("/messages"));
            } else {
                dispatch(loginFailure('ユーザIDに誤りがあります。'));
            }
        })
        .catch(error => {
            dispatch(loginFailure('ユーザIDに誤りがあります。'));
        })

        // ネットワーク呼び出し中に起きたエラーのキャッチもできる。
    };
}
