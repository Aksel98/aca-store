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
    container_div: {
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
    title1: {
        fontStyle: 'italic',
        padding: '0 10px',
        margin: 5
    },
    container_h3: {
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
    container_link_li: {
        display: "flex",
        color: WHITE,
        marginTop: 5,
        '&:hover': {
            color: ORANGE,
        },
    },
    container_p: {
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
    container_textField: {
        margin: 6,
    },
    container_button: {
        backgroundColor: ORANGE,
        borderRadius: 10,
        marginTop: 20,
        '&:hover': {
            color: ORANGE,
            backgroundColor: WHITE
        },
    },
    container_bottom: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    horizontal_line: {
        border: "1px solid white "
    },
    container_bottom_icon: {
        marginTop: 30,
        marginLeft: 10,
        color: ORANGE,
        fontSize: 30
    },
    container_bottom_link: {
        textAlign: "center",
        paddingBottom: 20
    }
}));

function Footer() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.container}>
                <div className={classes.container_div}>
                    <div className={classes.logo}>
                        <img src={LOGO} width={40} height={30} alt=""/>
                        <h2 className={classes.title1}>Online Shop</h2>
                    </div>
                    <h3 className={classes.container_h3}><Link className={classes.container_link} to="/">About Us</Link>
                    </h3>
                    <p className={classes.container_p}>We are the best electronics online shop.</p>
                    <h3 className={classes.container_h3}>Contact Us</h3>
                    <div className={classes.logo}>
                        <CallIcon style={{color: ORANGE}}/>
                        <p className={classes.container_p}>+374 99 11 11 11</p>
                    </div>
                    <div className={classes.logo}>
                        <MailIcon style={{color: ORANGE}}/>
                        <p className={classes.container_p}>onlineshop@shop.com</p>
                    </div>
                </div>
                <div className={classes.container_div}>
                    <h3 className={classes.container_h3}>Products</h3>
                    <ul>
                        <li>
                            <Link className={classes.container_link_li} to="/">Computers</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Mobile phones</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Apps</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Product 1</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Product 2</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Product 3</Link>
                        </li>
                    </ul>
                </div>
                <div className={classes.container_div}>
                    <h3 className={classes.container_h3}>Helpful links</h3>
                    <ul>
                        <li>
                            <Link className={classes.container_link_li} to="/">Services</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Supports</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Terms & conditions</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link className={classes.container_link_li} to="/">Helpful link 1</Link>
                        </li>
                    </ul>
                </div>
                <div className={classes.container_div}>
                    <h3 className={classes.container_h3}>Subscribe More info</h3>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField className={classes.container_textField}
                                   id="outlined-email-input"
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
                    <Button className={classes.container_button} variant="contained" color="primary"
                            href="#contained-buttons">
                        Subscribe
                    </Button>
                </div>
            </div>
            <div className={classes.container}>
                <div className={classes.container_bottom}>
                    <div className={classes.horizontal_line}></div>
                </div>
                <div className={classes.container_bottom_link}>
                    <FacebookIcon className={classes.container_bottom_icon}/>
                    <TwitterIcon className={classes.container_bottom_icon}/>
                    <InstagramIcon className={classes.container_bottom_icon}/>
                    <AlternateEmailIcon className={classes.container_bottom_icon}/>
                    <p className={classes.container_p}>2020 Onlineshop LLC ALL right reserved</p>
                </div>
            </div>
        </Router>
    );
}

export default Footer;
