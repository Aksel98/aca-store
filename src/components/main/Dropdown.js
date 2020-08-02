import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { BLACK, WHITE,} from "./Styles";

const useStyles = makeStyles(() => ({

    root: {

        position: 'relative',
    },

    dropdownTitle: {
        display: 'flex',
        alignItems: 'center',
    },

    dropdown: {
        background: BLACK,
        width: 'max-content',
        borderRadius: '7px',
        position: 'absolute',
        top: 20,
        right: 0,
        left: 0,
        zIndex: 1,
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',

        '& :not(selector)': {
            color: WHITE,
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
        <div className={classes.root} onClick={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className={classes.dropdownTitle}>
                <div>{props.name}</div>
                <ArrowDropDownRoundedIcon />
            </div>
            {hover && (<div className={classes.dropdown}>
                {props.dropdownContent}
            </div>)
            }
        </div>
    );
}