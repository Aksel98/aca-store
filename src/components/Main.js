import React, {useEffect, useState} from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
import {auth} from "./services/firebase/Firebase";
import {UserContext} from "./main/context/UserContext";

export default function Main() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : setCurrentUser(null)
        })
    }, [])

    return (
        <UserContext.Provider value={currentUser}>
            <Dashboard/>
        </UserContext.Provider>
    )
}
