import React, { useContext } from "react";
import { ARM_FLAG, BLUE, EN_FLAG, LOGO, ORANGE, RUS_FLAG, WHITE } from "../../main/constants/constants";
import { Link, useLocation } from "react-router-dom";
import { HOME_URL, LOGIN_URL } from "../../main/constants/navigations";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DropDown from "../../main/dropdown/Dropdown";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/redux/actions/userAction";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { TypeContext } from "../../main/contexts/typeContext";

const useStyles = makeStyles({
    subMenu: {
        color: WHITE,
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        marginRight: 15
    },
    cardItems: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, 0)',
        width: 13,
        height: 13,
        lineHeight: '12px',
        color: WHITE,
        backgroundColor: BLUE,
        fontWeight: 900,
        fontSize: 11,
        borderRadius: '50%',
        textAlign: 'center',
    },
    userLogo: {
        fontWeight: 'bold',
        width: '2rem',
        height: '2rem',
        lineHeight: '2rem',
        color: ORANGE,
        backgroundColor: WHITE,
        borderRadius: '50%',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
    },
    menuItem: {
        fontWeight: 'bold',
        color: WHITE,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '4px 5px',
    },
    login: {
        borderBottom: '2px solid transparent',
        cursor: 'pointer',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        }
    },
    title: {
        fontSize: props => props.media ? 15 : 24,
        fontWeight: 'bold',
        color: ORANGE,
        fontStyle: 'italic',
        textDecoration: 'none',
        margin: '10px',
        cursor: props => props.pathName && 'unset'
    },
    flagsImg: {
        width: 25,
        height: 15,
        padding: '0 5px'
    },
    checkoutLink: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        margin: '0 5px',
        borderBottom: '2px solid transparent',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        },
    },
    display: {
        display: "flex",
        alignItems: "center",
    },
    link: {
        textDecoration: 'none',
        color: WHITE
    }
});

export default function WebView(props) {
    const { changeLanguage, getFirstLetters } = props
    const currentUser = useSelector(state => state.user)
    const basketItems = useSelector(state => state.basket);
    const favItems = useSelector(state => state.favourites)
    const isAdmin = useContext(TypeContext)
    const dispatch = useDispatch()
    const location = useLocation();
    const { t } = useTranslation()
    const classes = useStyles({ pathName: location.pathname === HOME_URL });

    return (
        <React.Fragment>
            <div className={classes.display}>
                <img src={LOGO} width={40} height={30} alt="" />
                <Link to={HOME_URL} className={classes.title}>ACA store</Link>
            </div>
            <div className={classes.subMenu}>
                <DropDown name={<div className={classes.menuItem}>{t('languages')}</div>} dropdownContent={<>
                    <div>
                        <span onClick={() => changeLanguage('en')}>{t('english')}</span>
                        <img className={classes.flagsImg} src={EN_FLAG} alt="" />
                    </div>
                    <div>
                        <span onClick={() => changeLanguage('arm')}>{t('armenian')}</span>
                        <img className={classes.flagsImg} src={ARM_FLAG} alt="" />
                    </div>
                    <div>
                        <span onClick={() => changeLanguage('rus')}>{t('russian')}</span>
                        <img className={classes.flagsImg} src={RUS_FLAG} alt="" />
                    </div>
                </>} />
                {currentUser && <Link className={classes.checkoutLink} to='/favourites'>
                    <FavoriteTwoToneIcon className={classes.menuItem} />
                    {favItems?.length > 0 && <div className={classes.cardItems}>{favItems?.length}</div>}
                </Link>}
                <Link className={classes.checkoutLink} to='/checkout'>
                    <ShoppingCartIcon className={classes.menuItem} />
                    {basketItems?.length > 0 && <div className={classes.cardItems}>{basketItems.length}</div>}
                </Link>

                {currentUser &&
                    <DropDown name={<div className={classes.userLogo}>{getFirstLetters(currentUser.displayName)}</div>}
                        dropdownContent={
                            <React.Fragment>
                                {isAdmin && <div>
                                    <Link to={'/admin/users-list'} className={classes.link}>{t('users')}</Link>
                                </div>}
                                <div onClick={() => dispatch(logoutUser())}>{t('logout')}</div>
                            </React.Fragment>}
                    />}
                {!currentUser && <Link to={LOGIN_URL} className={`${classes.menuItem} ${classes.login}`}> {t('login')}</Link>}
            </div>
        </React.Fragment>
    )
}
