import React, {useState} from "react"
import SignIn from "./SignIn"
import useInput from "../main/hooks/useInput"
import {makeStyles} from "@material-ui/core/styles"
import {BLACK, MyButton, ORANGE, WHITE} from "../main/Styles"
import SignUp from "./SignUp";

const useStyles = makeStyles({
    container: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        position: 'relative',
        overflow: 'hidden',
        width: '768px',
        maxWidth: '100%',
        minHeight: '480px',
    },
    formContainer: {
        position: 'absolute',
        top: '0',
        height: '100%',
        transition: 'all 0.6s ease-in-out',
        '& form': {
            backgroundColor: WHITE,
            display: 'flex',
            flexDirection: 'column',
            padding: '0 40px',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }
    },
    overlayContainer: {
        transform: props => props && 'translateX(-100%)',
        position: 'absolute',
        top: '0',
        left: '50%',
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        transition: 'transform 0.6s ease-in-out',
        zIndex: '100',
    },
    overlay: {
        transform: props => props ? 'translateX(50%)' : 'translateX(0)',
        background: ORANGE,
        color: '#fff',
        position: 'relative',
        left: '-100%',
        height: '100%',
        width: '200%',
        transition: 'transform 0.6s ease-in-out',
    },
    overlayPanel: {
        position: 'absolute',
        top: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '50%',
        textAlign: 'center',
        transform: 'translateX(0)',
        transition: 'transform 0.6s ease-in-out',
    },
    overlayRight: {
        transform: props => props ? 'translateX(20%)' : 'translateX(0)',
        right: 0,
    },
    overlayLeft: {
        transform: props => props ? 'translateX(0)' : 'translateX(-20%)',
    },
})

export default function Login() {
    const name = useInput('')
    const surname = useInput('')
    const email = useInput('')
    const password = useInput('')
    const [error, setError] = useState('')
    const [rightPanel, setRightPanel] = useState(false)
    const classes = useStyles(rightPanel)

    function signIn(e) {
        e.preventDefault()
    }

    function signUp(e) {
        e.preventDefault()
    }

    return (
        <div className={classes.container}>
            <SignUp name={name}
                    surname={surname}
                email={email}
                    password={password}
                    error={error}
                    signIn={signUp}
                    rightPanel={rightPanel}
                    classFormContainer={classes.formContainer}/>
            <SignIn  email={email}
                    password={password}
                    error={error}
                    signIn={signIn}
                    rightPanel={rightPanel}
                    classFormContainer={classes.formContainer}/>
            <div className={classes.overlayContainer}>
                <div className={classes.overlay}>
                    <div className={`${classes.overlayPanel} ${classes.overlayLeft}`}>
                        <h1>Already have Account</h1>
                        <MyButton color="primary"
                                  variant="contained"
                                  onClick={() => setRightPanel(false)}>Sign In</MyButton>
                    </div>
                    <div className={`${classes.overlayPanel} ${classes.overlayRight}`}>
                        <h1>Create Account</h1>
                        <MyButton color="primary"
                                  variant="contained"
                                  onClick={() => setRightPanel(true)}>Sign Up</MyButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
