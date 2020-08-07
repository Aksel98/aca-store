import React, {useContext, useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Carousel from "./Carousel";
import CategoryList from "./category/CategoryList";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import ProductList from "./products/ProductList";
import {makeStyles} from "@material-ui/core/styles";
import Login from "../auth/Login";
import {UserContext} from "../main/context/UserContext";
import {BLACK} from "../main/Styles";
import {db} from "../services/Firebase";
import {HOME_URL, LOGIN_URL} from "../api/Navigations";

const useStyles = makeStyles({
    dashboardParent: {
        overflowX: 'hidden'
    },
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
    mainContent: {
        minHeight: 565
    }
})

export default function Dashboard() {
    const [category, setCategory] = useState([]);
    const currentUser = useContext(UserContext)
    const classes = useStyles()

    useEffect(() => {
        getAllCategoryInfo();
    }, []);

    async function getAllCategoryInfo() {
        try {
            const tempArr = [];
            const getCategory = (await db.collection('categories').get()).docs;
            getCategory.forEach((doc) => {
                let temp = doc.data();
                tempArr.push({...temp});
            });
            setCategory(tempArr);
        } catch (e) {
            console.log("can not  get the docs:", e);
        }
    }

    return (
        <Router>
            {currentUser ? (
                <div className={classes.dashboardParent}>
                    <Switch>
                        <Route path={HOME_URL}>
                            <div className={classes.mainContent}>
                                <Header/>
                                <Carousel/>
                                <CategoryList category={category}/>
                            </div>
                            <Footer/>
                        </Route>
                        <Route path={category.map(el => `/${el.name}`)}>
                            <div className={classes.mainContent}>
                                <Header/>
                                <ProductList/>
                            </div>
                            <Footer/>
                        </Route>
                        {/*<Redirect to={HOME_URL}/>*/}
                    </Switch>
                </div>
            ) : (
                <Switch>
                    <Route path={LOGIN_URL}>
                        <div className={classes.loginBg}>
                            <div className={classes.loginContainer}>
                                <Login/>
                            </div>
                        </div>
                    </Route>
                    <Route path={HOME_URL}>
                        <div className={classes.mainContent}>
                            <Header/>
                            <Carousel/>
                            <CategoryList category={category}/>
                        </div>
                        <Footer/>
                    </Route>
                    <Route path='/mobile'>
                        <div className={classes.mainContent}>
                            <Header/>
                            <ProductList/>
                        </div>
                        <Footer/>
                    </Route>
                    <Redirect to={HOME_URL}/>
                </Switch>
            )}
        </Router>
    )
}
