import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
<<<<<<< HEAD
import { auth } from "./services/firebase/Firebase";
import { UserContext } from "./main/context/UserContext";
import { BasketContext } from "./main/context/BasketContext";

export default function Main() {
    const [currentUser, setCurrentUser] = useState(null)
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('ItemsInBasket')) || []);
=======
import {auth} from "./services/firebase/Firebase";
import {UserContext} from "./main/context/UserContext";
import Loader from "./main/Loader";

export default function Main() {
    const [currentUser, setCurrentUser] = useState('')
>>>>>>> bc2d803748240a0d57084bd8f053ea907dba662e

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : setCurrentUser(null)
        })
    }, [])


    return (
        currentUser === '' ? <Loader/> :
        <UserContext.Provider value={currentUser}>
            <BasketContext.Provider value={[basket, setBasket]}>
                <Dashboard />
            </BasketContext.Provider>


        </UserContext.Provider>
    )
}
