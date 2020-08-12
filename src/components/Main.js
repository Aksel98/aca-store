import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
import {auth} from "./services/firebase/Firebase";
import {UserContext} from "./main/context/UserContext";
import { BasketContext } from "./main/context/BasketContext";

export default function Main() {
    const [currentUser, setCurrentUser] = useState(null)
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('ItemsInBasket')) || []);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : setCurrentUser(null)
        })
    }, [])


    return (
        <UserContext.Provider value={currentUser}>
            <BasketContext.Provider value={[basket, setBasket]}>
                <Dashboard />
            </BasketContext.Provider>


        </UserContext.Provider>
    )
}
