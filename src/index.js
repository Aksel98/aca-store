import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import './components/services/i18next'
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger"
import allReducers from "./components/services/redux/reducer/reducers";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension/index";

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(logger, thunk)),)

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={''}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
