import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CallIcon from '@material-ui/icons/Call';
import {BLACK, WHITE, ORANGE} from "../../main/constants/constants";
import MailIcon from '@material-ui/icons/Mail';
import {Link, useLocation} from "react-router-dom";
import {LOGO} from "../../main/constants/constants";
import {HOME_URL} from "../../main/constants/navigations";

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: BLACK,
        opacity: '0.7',
        paddingTop: 10,
    },
    main: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    itemsParent: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: "0 5px",
        textAlign: "center"
    },
    logo: {
        color: WHITE,
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        fontSize: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: WHITE,
        textDecoration: 'none',
        margin: 5,
        cursor: props => props && 'unset'
    },
    subTitle: {
        color: ORANGE,
        margin: 5,
    },
    container_link: {
        color: ORANGE,
        margin: 5,
        '&:hover': {
            color: WHITE,
        },
    },
    item: {
        display: "flex",
        justifyContent: 'center',
        textDecoration: 'none',
        color: WHITE,
        marginTop: 5,
        borderBottom: '2px solid transparent',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        },
    },
    contactInfo: {
        color: WHITE,
        margin: 5,
    },
    root: {
        marginTop: 5,
        color: 'red',
        backgroundColor: WHITE,
        borderRadius: 10,
        '& label.Mui-focused': {
            color: ORANGE,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                color: ORANGE,
                borderColor: ORANGE,
                borderRadius: 10,
            },
            '&.Mui-focused fieldset': {
                color: ORANGE,
                borderColor: ORANGE,
            },
        },
    },
    containerButton: {
        backgroundColor: ORANGE,
        borderRadius: 10,
        marginTop: 20,
        '&:hover': {
            color: ORANGE,
            backgroundColor: WHITE
        },
    },
    linksPart: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderTop: "2px solid white ",
        padding: 5,
        marginTop: 10
    }
}));

function Footer() {
    const location = useLocation();
    const classes = useStyles(location.pathname === HOME_URL);

    return (
        <div className={classes.container}>
            <div className={classes.main}>
                <div className={classes.itemsParent}>
                    <div className={classes.logo}>
                        <img src={LOGO} width={40} height={30} alt=""/>
                        <Link to={HOME_URL} className={classes.title}>ACA store</Link>
                    </div>
                    <h3 className={classes.subTitle}>Contact Us</h3>
                    <div className={classes.logo}>
                        <CallIcon style={{color: ORANGE}}/>
                        <p className={classes.contactInfo}>+374 99 11 11 11</p>
                    </div>
                    <div className={classes.logo}>
                        <MailIcon style={{color: ORANGE}}/>
                        <p className={classes.contactInfo}>onlineshop@shop.com</p>
                    </div>
                </div>
                <div className={classes.itemsParent}>
                    <h3 className={classes.subTitle}>Helpful links</h3>
                    <div>
                        <Link to="" className={classes.item}>Services</Link>
                        <Link to="" className={classes.item}>Supports</Link>
                        <Link to="" className={classes.item}>Terms & conditions</Link>
                        <Link to="" className={classes.item}>Privacy Policy</Link>
                    </div>
                </div>
            </div>
            <div className={classes.linksPart}/>
        </div>
    );
}

export default Footer;
