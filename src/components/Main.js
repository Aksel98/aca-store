import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard/dashboard/Dashboard";
import { UserContext } from "./main/context/UserContext";
import { BasketContext } from "./main/context/BasketContext";
import Loader from "./main/loader/Loader";
import {connect} from "react-redux";
import {getUserData} from "./services/redux/actions/userAction";

function Main(props) {
    // const [currentUser, setCurrentUser] = useState('')
    // const currentUser = props.user
    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('ItemsInBasket')) || []);

    useEffect(() => {
        props.getUserData()
        // auth.onAuthStateChanged(user => {
        //     user ? setCurrentUser(user) : setCurrentUser(null)
        // })
    }, [])

    return (
        props.user === false ? <Loader /> :
            <UserContext.Provider value={props.user}>
                <BasketContext.Provider value={[basket, setBasket]}>
                    <Dashboard />
                </BasketContext.Provider>
            </UserContext.Provider>
    )
}
const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    getUserData
}

export default connect(mapStateToProps, mapActionsToProps)(Main)
