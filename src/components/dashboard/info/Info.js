import React from "react";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {BLUE} from "../../main/constants/constants";
import BackRouter from "../../main/BackRouter";

const useStyles = makeStyles(({
    main: {
        textDecoration: 'none',
        color: BLUE,
        fontSize: 50,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 100
    }
}))

export default function Info() {
    const {t} = useTranslation()
    const classes = useStyles()

    return (
        <React.Fragment>
            <BackRouter/>
            <Link to="/info" className={classes.main}>{t('soon')}...</Link>
        </React.Fragment>
    )
}
