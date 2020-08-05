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

const useStyles = makeStyles(() => ({
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
        color: WHITE,
        display: "flex",
        alignItems: "center",
    },
    dropdownItem: {
        fontWeight: 'bold',
        color: WHITE,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
        cursor: 'pointer'
    },
    title: {
        fontStyle: 'italic',
        color: ORANGE,
        padding: '0 10px',
    }
}));

const MyAppBar = styled(AppBar)({
    background: 'transparent',
    boxShadow: "none",
});

export default function Header() {
    const classes = useStyles();
    const currentUser = useContext(UserContext)
    const {t, i18n} = useTranslation()
    console.log(currentUser)

    function handleClick(lang) {
        return i18n.changeLanguage(lang)
    }

    function logOut() {
        auth.signOut().then()
    }

    return (
        <MyAppBar>
            <div className={classes.menu}>
                <div className={classes.subMenu}>
                    <img src={LOGO} width={40} height={30} alt=""/>
                    <h2 className={classes.title}>Online Shop</h2>
                </div>
                <div className={classes.subMenu}>
                    <div className={classes.dropdownItem}><DropDown name={t('languages')} dropdownContent={<>
                        <div onClick={() => handleClick('en')}>{t('english')}</div>
                        <div onClick={() => handleClick('rus')}>{t('russian')}</div>
                        <div onClick={() => handleClick('arm')}>{t('armenian')}</div>
                    </>}/>
                    </div>
                    <ShoppingCartIcon style={{cursor: 'pointer'}}/>
                    {!currentUser && <Link to="/login" className={classes.dropdownItem}> {t('login')}</Link>}
                    {currentUser && <div onClick={logOut} className={classes.dropdownItem}>{t('logout')}</div>}
                </div>
            </div>
        </MyAppBar>
    )
}
