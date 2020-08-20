import React from 'react';
import {makeStyles, styled} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import {BLACK} from "../../main/constants/Constants"
import {Hidden, useMediaQuery} from "@material-ui/core";
import WebView from "./WebView";
import MobileView from "./MobileView";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    position: {
        position: props => props && 'unset'
    },
    menu: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: 'space-between',
        background: BLACK,
        opacity: '0.7',
        padding: '0 20px'
    }
});

const MyAppBar = styled(AppBar)({
    background: 'transparent',
    boxShadow: "none",
});

export default function Header() {
    const media = useMediaQuery('(max-width:600px)');
    const classes = useStyles(media);
    const {t, i18n} = useTranslation()

    function getFirstLetters(user) {
        return user?.split(' ').map(namePart => namePart.slice(0, 1).toUpperCase()).join('');
    }

    function changeLang(lang) {
        return i18n.changeLanguage(lang)
    }

    return (
        <MyAppBar className={classes.position}>
            <div className={classes.menu}>
                <Hidden only={[ 'xs']}>
                    <WebView changeLanguage={changeLang} getFirstLetters={getFirstLetters}/>
                </Hidden>
                <Hidden only={['lg', 'md', 'sm', 'xl']}>
                    <MobileView changeLanguage={changeLang} getFirstLetters={getFirstLetters}/>
                </Hidden>
            </div>
        </MyAppBar>
    )
}
