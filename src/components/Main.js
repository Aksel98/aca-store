import React, {useEffect, useState} from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
import Loader from "./main/loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "./services/redux/actions/userAction";
import {db} from "./services/firebase/Firebase";
import {ADMIN} from "./main/constants/types";
import {TypeContext} from "./main/contexts/typeContext";

export default function Main() {
    const [isAdmin, setIsAdmin] = useState(null)
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    useEffect(() => {
        getUserType()
    }, [currentUser])

    function getUserType() {
        if (currentUser) {
            db.collection('users').doc(currentUser.uid).get().then(user => {
                setIsAdmin(user.data()?.type === ADMIN)
            }).catch(err => console.log(err))
        }
    }

    return (
        <TypeContext.Provider value={isAdmin}>
            {(currentUser === false) ? <Loader/> : <Dashboard/>}
        </TypeContext.Provider>
    )
}
