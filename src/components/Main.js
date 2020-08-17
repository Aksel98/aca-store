import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
import { auth } from "./services/firebase/Firebase";
import { UserContext } from "./main/context/UserContext";
import { BasketContext } from "./main/context/BasketContext";
import Loader from "./main/loader/Loader";

import { createStore } from "redux";
import allReducers from "./services/redux/reducer/reducers";
import { Provider } from 'react-redux';


// const ourStore = createStore(
//     allReducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
export default function Main() {
    const [currentUser, setCurrentUser] = useState('')
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('ItemsInBasket')) || []);



    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : setCurrentUser(null)
        })
    }, [])


    return (
        currentUser === '' ? <Loader /> :
            // <Provider store={ourStore}>
            <UserContext.Provider value={currentUser}>
                <BasketContext.Provider value={[basket, setBasket]}>

                    <Dashboard />

                </BasketContext.Provider>
            </UserContext.Provider>
        // </Provider>

    )
}
