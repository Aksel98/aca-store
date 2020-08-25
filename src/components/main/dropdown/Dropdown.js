import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import {BLACK, ORANGE,} from "../constants/constants"

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
    },
    dropdownTitle: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid transparent',
        paddingBottom: 5,
        cursor: 'pointer',
        '&:hover': {
            borderBottom: `2px solid ${ORANGE}`
        },
    },
    dropdown: {
        background: BLACK,
        width: 'max-content',
        minWidth: 110,
        borderRadius: '0 0 7px 7px',
        position: 'absolute',
        top: 35,
        right: 0,
        left: 0,
        zIndex: 1,
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        "& div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: '10px 5px',
            padding: '5px 0',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderBottom: '2px solid transparent',
            '&:hover': {
                borderBottom: `2px solid ${ORANGE}`
            },
        }
    },
}));

export default function DropDown(props) {
    const classes = useStyles();
    const [hover, setHover] = useState(false);

    return (
        <div className={classes.root}>
            <div onClick={() => setHover(true)} className={classes.dropdownTitle}>
                <div>{props.name}</div>
                <ArrowDropDownRoundedIcon/>
            </div>
            {hover && <div onMouseLeave={() => setHover(false)} className={classes.dropdown}>
                {props.dropdownContent}
            </div>}
        </div>
    );
}
