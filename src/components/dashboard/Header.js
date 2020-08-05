import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import { BLACK, WHITE } from "../main/Styles";
import DropDown from "../main/Dropdown";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({

    menu: {
        height: '80px',
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
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
        cursor: 'pointer'
    },
    title: {
        fontStyle: 'italic',
        padding: '0 10px',
    }
}));

const MyAppBar = styled(AppBar)({
    background: 'transparent',
    boxShadow: "none",
});

export default function Header() {
    const classes = useStyles();
    const { t, i18n } = useTranslation()

    function handleClick(lang) {
        return i18n.changeLanguage(lang)
    }

    return (
        <MyAppBar>
            <div className={classes.menu}>
                <div className={classes.subMenu}>
                    <img src="/images/logo.png" width={20} height={20} alt="" />
                    <h2 className={classes.title}>Online Shop</h2>
                </div>
                <div className={classes.subMenu}>
                    <div className={classes.dropdownItem}><DropDown name={t('languages')} dropdownContent={<>
                        <div onClick={() => handleClick('en')}>{t('english')}</div>
                        <div onClick={() => handleClick('rus')}>{t('russian')}</div>
                        <div onClick={() => handleClick('arm')}>{t('armenian')}</div>
                    </>} />
                    </div>
                    <div className={classes.dropdownItem}>{t('login')}</div>
                </div>
            </div>
        </MyAppBar>
    )
}
