import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { HOME_URL } from "../../services/api/Navigations";
import Header from "../Header";
import Carousel from "../carousel/Carousel";
import CategoryList from "../category/CategoryList";
import Footer from "../Footer";
import ProductList from "../products/ProductList";
import { makeStyles } from "@material-ui/core/styles";
import Device from "../Device";

import Checkout from "../checkout/Checkout";

const useStyles = makeStyles({
    dashboardParent: {
        overflowX: 'hidden'
    },
    mainContent: {
        minHeight: 730
    }
})

export default function GeneralRoutes() {
    const classes = useStyles();

    return (
        <Switch className={classes.dashboardParent}>
            <Route path={HOME_URL}>
                <div className={classes.mainContent}>
                    <Header />
                    <Carousel />
                    <CategoryList />
                </div>
                <Footer />
            </Route>
            <Route exact path='/checkout'>
                <Checkout />
            </Route>
            <Route exact path='/categories/:category'>
                <div className={classes.mainContent}>
                    <Header />
                    <ProductList />
                </div>
                <Footer />
            </Route>
            <Route exact path='/categories/:category/:id'>
                <div className={classes.mainContent}>
                    <Header />
                    <Device />
                </div>
                <Footer />
            </Route>
            <Redirect to={HOME_URL} />
        </Switch>
    )
}
