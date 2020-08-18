import React, {useEffect, useState} from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
import {BasketContext} from "./main/context/BasketContext";
import Loader from "./main/loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "./services/redux/actions/userAction";

export default function Main() {
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('ItemsInBasket')) || []);

    useEffect(() => {
        dispatch(getUserData())
    }, [])

    return (
        currentUser === false ? <Loader/> :
            <BasketContext.Provider value={[basket, setBasket]}>
                <Dashboard/>
            </BasketContext.Provider>
    )
}
