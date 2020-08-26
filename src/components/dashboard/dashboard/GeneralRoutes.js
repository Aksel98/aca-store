import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {HOME_URL} from "../../main/constants/navigations";
import Header from "../header/Header";
import Carousel from "../carousel/Carousel";
import CategoryList from "../category/CategoryList";
import Footer from "../footer/Footer";
import ProductList from "../products/ProductList";
import Device from "../device/Device";
import CheckoutItems from "../checkout/CheckoutItems";
import UsersList from "../../admin/UsersList";
import {Hidden, withStyles} from "@material-ui/core";

const styles = () => ({
    main: {
        height: 'calc(100vh - 180px)',
        overflow: 'auto',
        overflowX: 'hidden'
    },
    mainTablet: {
        height: 'calc(100vh - 260px)',
        overflow: 'auto',
        overflowX: 'hidden'
    }
})

class GeneralRoutes extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <Switch>
                <Route path={HOME_URL}>
                    <Header/>
                    <Hidden  only={['xs']}>
                        <div className={classes.main}>
                            <Carousel/>
                            <CategoryList/>
                        </div>
                    </Hidden>
                    <Hidden only={['lg', 'md', 'sm', 'xl']}>
                        <div className={classes.mainTablet}>
                            <Carousel/>
                            <CategoryList/>
                        </div>
                    </Hidden>
                    <Footer/>
                </Route>
                <Route exact path='/checkout'>
                    <CheckoutItems/>
                </Route>
                <Route exact path='/categories/:category'>
                    <Header/>
                    <ProductList/>
                    <Footer/>
                </Route>
                <Route exact path='/categories/:category/:id'>
                    <Header/>
                    <Device/>
                    <Footer/>
                </Route>
                <Route exact path='/userslist'>
                    <div>
                        <UsersList/>
                    </div>
                </Route>
                <Redirect to={HOME_URL}/>
            </Switch>
        )
    }
}

export default withStyles(styles)(GeneralRoutes)
