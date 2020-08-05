import React, {useContext} from 'react';
import {makeStyles, styled} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import {BLACK, ORANGE, WHITE} from "../main/Styles";
import DropDown from "../main/Dropdown";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {UserContext} from "../main/context/UserContext";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {auth} from "../services/Firebase";
import {LOGO} from "../constants/Constants";
import {useMediaQuery} from "@material-ui/core";

const useStyles = makeStyles({
    menu: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: 'space-between',
        background: BLACK,
        opacity: '0.7',
        padding: '0 20px'
    },
    subMenu: {
        minWidth: 230,
        color: WHITE,
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',

    },
    display: {
        display: "flex",
        alignItems: "center",
    },
    dropdownItemParent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: '10px 5px',
        padding: '5px 0',
        borderBottom: '2px solid transparent',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        },
    },
    menuItem: {
        fontWeight: 'bold',
        color: WHITE,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
        padding: '3px 0',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        },
    },
    title: {
        fontStyle: 'italic',
        color: ORANGE,
        padding: '0 10px',
    },
    flagsImg: {
        width: 25,
        height: 15,
        padding: '0 5px'
    },
    flagsImgMedia: {
        width: 35,
        height: 20,
        padding: '5px 0'
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
});

const MyAppBar = styled(AppBar)({
    background: 'transparent',
    boxShadow: "none",
});

export default function Header() {
    const currentUser = useContext(UserContext)
    const media = useMediaQuery('(max-width:600px)');
    const classes = useStyles();
    const {t, i18n} = useTranslation()

    function handleClick(lang) {
        return i18n.changeLanguage(lang)
    }

    function logOut() {
        auth.signOut().then()
    }

    return (
        <MyAppBar style={{position: media && 'unset'}}>
            <div className={classes.menu}>
                <div className={classes.display}>
                    <img src={LOGO} width={40} height={30} alt=""/>
                    {media ? <h3 className={classes.title}>Online Shop</h3>  : <h2 className={classes.title}>Online Shop</h2>}
                    {media && <>
                        <ShoppingCartIcon className={classes.menuItem}/>
                        {!currentUser && <Link to="/login" className={classes.menuItem}> {t('login')}</Link>}
                        {currentUser && <div onClick={logOut} className={classes.menuItem}>{t('logout')}</div>}
                    </>}
                </div>
                {!media ? <div className={classes.subMenu}>
                    <div className={classes.menuItem}><DropDown name={t('languages')} dropdownContent={<>
                        <div className={classes.dropdownItemParent} style={{marginTop: 15}}
                             onClick={() => handleClick('en')}>
                            {t('english')}<img className={classes.flagsImg} src="/images/english-flag.png"/>
                        </div>
                        <div className={classes.dropdownItemParent} onClick={() => handleClick('arm')}>
                            {t('armenian')}<img className={classes.flagsImg} src="/images/armenian-flag.png"/>
                        </div>
                        <div className={classes.dropdownItemParent} onClick={() => handleClick('rus')}>
                            {t('russian')}<img className={classes.flagsImg} src="/images/russian-flag.png"/>
                        </div>
                    </>}/>
                    </div>
                    <ShoppingCartIcon className={classes.menuItem}/>
                    {!currentUser && <Link to="/login" className={classes.menuItem}> {t('login')}</Link>}
                    {currentUser && <div onClick={logOut} className={classes.menuItem}>{t('logout')}</div>}
                </div> : <div style={{display: 'flex', padding: '5px 0'}}>
                    <img onClick={() => handleClick('en')}  className={`${classes.flagsImgMedia} ${classes.menuItem}`} src="/images/english-flag.png"/>
                    <img onClick={() => handleClick('arm')} className={`${classes.flagsImgMedia} ${classes.menuItem}`} src="/images/armenian-flag.png"/>
                    <img onClick={() => handleClick('rus')} className={`${classes.flagsImgMedia} ${classes.menuItem}`} src="/images/russian-flag.png"/>
                </div>}

            </div>
        </MyAppBar>
    )
}
