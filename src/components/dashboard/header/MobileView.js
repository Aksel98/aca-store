import React, {useContext} from "react";
import {ARM_FLAG, BLUE, EN_FLAG, LOGO, ORANGE, RUS_FLAG, WHITE} from "../../main/constants/constants";
import {Link, useLocation} from "react-router-dom";
import {HOME_URL, LOGIN_URL} from "../../main/constants/navigations";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DropDown from "../../main/dropdown/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {logoutUser} from "../../services/redux/actions/userAction";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import {makeStyles} from "@material-ui/core/styles";
import {TypeContext} from "../../main/contexts/typeContext";

const useStyles = makeStyles({
    main: {
        width: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ORANGE,
        fontStyle: 'italic',
        textDecoration: 'none',
        margin: '10px',
        cursor: props => props.pathName && 'unset'
    },
    menuItem: {
        fontWeight: 'bold',
        color: WHITE,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '3px 0',
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
    flagsImg: {
        width: 35,
        height: 20,
        paddingBottom: 5,
        margin: '0 12px',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        },
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

export default function (props) {
    const {changeLanguage, getFirstLetters} = props
    const currentUser = useSelector(state => state.user)
    const basketItems = useSelector(state => state.basket);
    const favItems = useSelector(state => state.favourites)
    const dispatch = useDispatch()
    const location = useLocation();
    const isAdmin = useContext(TypeContext)
    const {t} = useTranslation()
    const classes = useStyles({pathName: location.pathname === HOME_URL});

    return (
        <React.Fragment>
            <div className={classes.main}>
                <div className={classes.display}>
                    <img src={LOGO} width={40} height={30} alt=""/>
                    <Link to={HOME_URL} className={classes.title}>ACA store</Link>
                </div>
                <div className={classes.display}>
                    {currentUser ? <div className={classes.menuItem}>
                        <DropDown
                            name={<div className={classes.userLogo}>{getFirstLetters(currentUser.displayName)}</div>}
                            dropdownContent={
                                <React.Fragment>
                                    {isAdmin && <div>
                                        <Link to={'users-list'} className={classes.link}>{t('users')}</Link>
                                    </div>}
                                    <div onClick={() => dispatch(logoutUser())}>{t('logout')}</div>
                                </React.Fragment>}/>
                    </div> : <Link to={LOGIN_URL} className={classes.menuItem}> {t('login')}</Link>}
                    {currentUser && <Link className={classes.checkoutLink} to='/favourites'>
                        <FavoriteTwoToneIcon className={classes.menuItem}/>
                        {favItems?.length > 0 && <div className={classes.cardItems}>{favItems?.length}</div>}
                    </Link>}
                    <Link className={classes.checkoutLink} to='/checkout'>
                        <ShoppingCartIcon className={classes.menuItem}/>
                        {basketItems?.length > 0 && <div className={classes.cardItems}>{basketItems.length}</div>}
                    </Link>
                </div>
            </div>
            <div>
                <img onClick={() => changeLanguage('en')} className={classes.flagsImg} src={EN_FLAG} alt=""/>
                <img onClick={() => changeLanguage('arm')} className={classes.flagsImg} src={ARM_FLAG} alt=""/>
                <img onClick={() => changeLanguage('rus')} className={classes.flagsImg} src={RUS_FLAG} alt=""/>
            </div>
        </React.Fragment>
    )
}
