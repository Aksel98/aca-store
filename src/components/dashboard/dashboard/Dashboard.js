import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Login from "../../auth/Login";
import {BLACK} from "../../main/constants/Constants"
import {LOGIN_URL} from "../../main/constants/navigations";
import GeneralRoutes from "./GeneralRoutes";
import {useSelector} from "react-redux";
import Header from "../header/Header";
import FavItemList from "../favourites/FavItemList";
import Footer from "../footer/Footer";
import SnackBar from "../../main/popups/SnackBar";
import Payment from "../payment/Payment";

const useStyles = makeStyles({
    loginBg: {
        height: '100vh',
        backgroundColor: BLACK,
        opacity: '0.7'
    },
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '150px 10px',
        opacity: '0.6',
    },
    favouritesPage: {
        height: 710
    }
})

export default function Dashboard() {
    const currentUser = useSelector(state => state.user)
    const ui = useSelector(state => state.ui)
    const classes = useStyles()

    return (
        <Router>
            {currentUser ?
                <Switch>
                    <Route path='/favourites'>
                        <Header/>
                        <div className={classes.favouritesPage}>
                            <FavItemList/>
                        </div>
                        <Footer/>
                    </Route>
                    <Route path='/payment'>
                        <div>
                            <Header/>
                            <Payment/>
                            <Footer/>
                        </div>
                    </Route>
                    <GeneralRoutes/>
                </Switch>
                : <Switch>
                    <Route path={LOGIN_URL}>
                        <div className={classes.loginBg}>
                            <div className={classes.loginContainer}>
                                <Login/>
                            </div>
                        </div>
                    </Route>
                    <GeneralRoutes/>
                </Switch>}
            {ui.error && <SnackBar message={ui.error} error/>}
            {ui.success && <SnackBar message={ui.success}/>}
        </Router>
    )
}
