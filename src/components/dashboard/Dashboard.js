import React from "react";
import Header from "./Header";
import SnackBar from "../main/SnackBar";
import Footer from "./Footer";
import Carousel from "./Carousel";
import CategoryList from "./CategoryList";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom"
import ProductList from "./ProductList";
import Button from "../main/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



export default function Dashboard() {
    return (
        <BrowserRouter>
            <Header />

            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path='/home'>
                    <Carousel />
                    <CategoryList />
                </Route>
                <Route path={'/:tablet' || '/:laptop' || '/:mobile' || '/:watches'}>
                    <Link style={{ textDecoration: 'none' }} to="/">
                        <Button top='90px' radius='50%'><ArrowBackIcon /></Button>
                    </Link>
                    <ProductList />
                </Route>
            </Switch>
            <Footer />

        </BrowserRouter>
    )
}
