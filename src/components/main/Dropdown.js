import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import {BLACK} from "./Styles";

const useStyles = makeStyles(() => ({

    root: {
        position: 'relative',
    },

    dropdownTitle: {
        display: 'flex',
        alignItems: 'center',
    },

    dropdown: {
        width: 'max-content',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',

        '& :not(selector)': {
            color: BLACK,
            margin: '20px 15px 20px 2px',
            borderBottom: '2px solid transparent'
        },

        '& :not(selector):hover': {
            borderBottom: '2px solid'
        },

        '& :first-child': {
            marginTop: '35px',
        },
    },
}));

export default function DropDown(props) {
    const classes = useStyles();
    const [hover, setHover] = useState(false);

    return (
            <div className={classes.root}>
                <div className={classes.dropdownTitle} onMouseEnter={() => setHover(true)} >
                    {props.name}
                    <ArrowDropDownRoundedIcon/>
                </div>
                {hover && (<div className={classes.dropdown} onMouseLeave={() => setHover(false)}>
                    {props.dropdownContent}
                </div>)
                }
            </div>
    );
}
