import React, {useEffect} from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
import Loader from "./main/loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "./services/redux/actions/userAction";

export default function Main() {
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    return (
        currentUser === false ? <Loader/> : <Dashboard/>
    )
}
