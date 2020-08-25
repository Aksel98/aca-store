import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { HOME_URL } from "../../services/api/Navigations";
import Header from "../header/Header";
import Carousel from "../carousel/Carousel";
import CategoryList from "../category/CategoryList";
import Footer from "../footer/Footer";
import ProductList from "../products/ProductList";
import { makeStyles } from "@material-ui/core/styles";
import Device from "../device/Device";
import CheckoutItems from "../checkout/CheckoutItems";
import Payment from "../payment/Payment";
import { useMediaQuery } from "@material-ui/core";
import UsersList from "../../admin/UsersList";

const useStyles = makeStyles({
    dashboardParent: {
        overflowX: 'hidden'
    },
    categoryList: {
        minHeight: 790
    },
    productList: {
        height: props => props ? 790 : 730
    }
})

export default function GeneralRoutes() {
    const media = useMediaQuery('(max-width:600px)');
    const classes = useStyles(media);

    return (
        <Switch className={classes.dashboardParent}>
            <Route path={HOME_URL}>
                <div className={classes.categoryList}>
                    <Header />
                    <Carousel />
                    <CategoryList />
                </div>
                <Footer />
            </Route>
            <Route exact path='/checkout'>
                <CheckoutItems />
            </Route>
            <Route exact path='/payment'>
                <div>
                    <Header />
                    <Payment />
                    <Footer />
                </div>
            </Route>
            <Route exact path='/categories/:category'>
                <div className={classes.productList}>
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
            <Route exact path='/userslist'>
                <div>
                    <UsersList />
                </div>
            </Route>
            <Redirect to={HOME_URL} />
        </Switch>
    )
}
