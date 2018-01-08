import React           from "react";
import { render } from 'react-dom'
import { createStore, applyMiddleware } from "redux";
import { Provider }    from "react-redux";
import { rootReducer } from "./modules/index";
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { Route } from "react-router-dom"
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { ConnectedLogin }    from "./containers/login";
import { ConnectedMessages } from "./containers/messages";

import cyan from 'material-ui/colors/cyan';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';

/*
import registerServiceWorker from './registerServiceWorker';
*/
const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
    rootReducer,
    /* for ReduxDevTool Chrome Extention */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(middleware, thunkMiddleware),
);

const theme = createMuiTheme({
    palette: {
        primary: cyan,
        accent: pink,
        error: red,
        type: 'light',
    },
});
theme.palette.text.primary = '#fff';

render (
    <Provider store={ store }>
        <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={ history }>
                <div>
                    <Route exact path="/" component={ ConnectedLogin }    />
                    <Route exact path="/messages" component={ ConnectedMessages } />
                </div>
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
);
/*
registerServiceWorker();
*/
