import React, {useState} from "react"
import SignIn from "./SignIn"
import useInput from "../main/hooks/useInput";
import {makeStyles} from "@material-ui/core/styles"
import {BLACK} from "../main/Styles";

const useStyles = makeStyles(() => ({
    loginPage: {
        width: '280px',
        color: BLACK,
        '& h1': {
            float: 'left',
            fontSize: '40px',
            borderBottom: `6px solid  ${BLACK}`,
            marginBottom: '50px',
        }
    },
}))
export default function Login() {
    const email = useInput('')
    const password = useInput('')
    const [error, setError] = useState('')
    const classes = useStyles()

    function signIn(e) {
        e.preventDefault()
    }

    return (
        <div className={classes.loginPage}>
            <h1>Sign in</h1>
            <SignIn email={email} password={password} error={error} signIn={signIn}/>
        </div>
    )
}
