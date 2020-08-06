import React, {useEffect, useState} from "react";
import Dashboard from "./dashboard/Dashboard";
import {auth} from "./services/Firebase";
import {UserContext} from "./main/context/UserContext";
import Loader from "./main/Loader";

export default function Main() {
    const [currentUser, setCurrentUser] = useState(null)
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user ? setCurrentUser(user) : setCurrentUser(null)
            setLoadingData(false)
        })
    }, [])

    return (
        <UserContext.Provider value={currentUser}>
            {loadingData ? <Loader/> : <Dashboard/>}
        </UserContext.Provider>
    )
}
