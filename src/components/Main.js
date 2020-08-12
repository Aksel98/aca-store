import React, {useEffect, useState} from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
import {auth} from "./services/firebase/Firebase";
import {UserContext} from "./main/context/UserContext";
import Loader from "./main/Loader";

export default function Main() {
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : setCurrentUser(null)
        })
    }, [])

    return (
        currentUser === '' ? <Loader/> :
        <UserContext.Provider value={currentUser}>
            <Dashboard/>
        </UserContext.Provider>
    )
}
