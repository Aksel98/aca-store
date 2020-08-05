import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CallIcon from '@material-ui/icons/Call';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import TwitterIcon from '@material-ui/icons/Twitter';
import {BLACK, WHITE, ORANGE} from "../main/Styles";
import MailIcon from '@material-ui/icons/Mail';
import {BrowserRouter as Router, Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import {LOGO} from "../constants/Constants";

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: 20,
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: BLACK,
        opacity: '0.7',
    },
    itemsParent: {
        display: "flex",
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: "0 8px",
        textAlign: "center"
    },
    logo: {
        color: WHITE,
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
    },
    title: {
        fontStyle: 'italic',
        padding: '0 10px',
        margin: 5
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
        marginTop: 20,
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
        border: "1px solid white "
    },
    socialIconsParent: {
        textAlign: "center",
        paddingBottom: 20
    },
    socialIcons: {
        margin: '10px 0 0 10px',
        color: ORANGE,
        fontSize: 30
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.container}>
                <div className={classes.itemsParent}>
                    <div className={classes.logo}>
                        <img src={LOGO} width={40} height={30} alt=""/>
                        <h2 className={classes.title}>Online Shop</h2>
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
                        <Link className={classes.item}>Services</Link>
                        <Link className={classes.item}>Supports</Link>
                        <Link className={classes.item}>Terms & conditions</Link>
                        <Link className={classes.item}>Privacy Policy</Link>
                    </div>
                </div>
                <div className={classes.itemsParent}>
                    <h3 className={classes.subTitle}>Subscribe More info</h3>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField style={{margin: 10}}
                                   label="Enter your email"
                                   type="email"
                                   autoComplete="off"
                                   variant="outlined"
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <MailIcon style={{color: ORANGE}}/>
                                           </InputAdornment>
                                       ),
                                   }}/>
                    </form>
                    <Button className={classes.containerButton} variant="contained" color="primary"
                            href="#contained-buttons">
                        Subscribe
                    </Button>
                </div>
            </div>
            <div className={classes.container}>
                <div className={classes.linksPart}/>
                <div className={classes.socialIconsParent}>
                    <FacebookIcon className={classes.socialIcons}/>
                    <TwitterIcon className={classes.socialIcons}/>
                    <InstagramIcon className={classes.socialIcons}/>
                    <AlternateEmailIcon className={classes.socialIcons}/>
                    <p className={classes.contactInfo}>2020 Online Shop LLC ALL right reserved</p>
                </div>
            </div>
        </Router>
    );
}

export default Footer;
