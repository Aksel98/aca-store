import React, {useState} from "react"
import SignIn from "./SignIn"
import {makeStyles} from "@material-ui/core/styles"
import {BLACK, BLUE_GRADIENT, MyButton, WHITE} from "../main/constants/Constants"
import SignUp from "./SignUp";
import {useMediaQuery} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";
import {auth} from "../services/firebase/Firebase";
import {useHistory} from "react-router-dom";
import SnackBar from "../main/SnackBar";
import {HOME_URL} from "../services/api/Navigations";

const useStyles = makeStyles({
    backIcon: {
        position: 'absolute',
        zIndex: 5,
        display: 'flex',
        margin: '20px',
        padding: '5px',
        border: `1px solid ${BLACK}`,
        borderRadius: '50%',
        color: BLACK,
        cursor: 'pointer',
    },
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
            padding: props => props.media ? '0 30px' : '0 5px',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }
    },
    overlayContainer: {
        transform: props => props.rightPanel && 'translateX(-100%)',
        position: 'absolute',
        top: '0',
        left: '50%',
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        transition: 'transform 0.6s ease-in-out',
        zIndex: '4',
    },
    overlay: {
        transform: props => props.rightPanel ? 'translateX(50%)' : 'translateX(0)',
        background: BLUE_GRADIENT,
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
        transform: props => props.rightPanel ? 'translateX(20%)' : 'translateX(0)',
        right: 0,
    },
    overlayLeft: {
        transform: props => props.rightPanel ? 'translateX(0)' : 'translateX(-20%)',
    },
})

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [rightPanel, setRightPanel] = useState(false)
    const media = useMediaQuery('(min-width:600px)');
    const classes = useStyles({rightPanel, media})
    const {t} = useTranslation()
    const history = useHistory();

    function signUpPageHandler() {
        setRightPanel(true)
        changePage()
    }

    function signInPageHandler() {
        setRightPanel(false)
        changePage()

    }

    function changePage() {
        setError('')
        setEmail('')
        setPassword('')
    }

    function signIn(e) {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setEmail('')
            history.push(HOME_URL)
        }).catch(err => {
            setError(err.message)
        }).finally(() => {
            setPassword('')
        })
    }

    function signUp(e) {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).then((result) => {
            setEmail('')
            history.push(HOME_URL)
            return result.user.updateProfile({
                displayName: ''
            })
        }).catch(err => {
            setError(err.message)
        }).finally(() => {
            setPassword('')
        })
    }

    function onValueChange(e) {
        e.target.type === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)
        setError('')
    }

    return (
        <div className={classes.container}>
            <Link to={HOME_URL} className={classes.backIcon}><ArrowBackIcon/></Link>
            <SignUp email={email}
                    password={password}
                    error={error}
                    onValueChange={onValueChange}
                    signUp={signUp}
                    rightPanel={rightPanel} a
                    classFormContainer={classes.formContainer}
                    media={media}/>
            <SignIn email={email}
                    password={password}
                    error={error}
                    onValueChange={onValueChange}
                    signIn={signIn}
                    rightPanel={rightPanel}
                    classFormContainer={classes.formContainer}
                    media={media}/>
            <div className={classes.overlayContainer}>
                <div className={classes.overlay}>
                    <div className={`${classes.overlayPanel} ${classes.overlayLeft}`}>
                        {media ? <h1>{t('alreadyHaveAccount')}</h1> : <h3>{t('alreadyHaveAccount')}</h3>}
                        <MyButton color="primary"
                                  maxwidth="90%"
                                  variant="contained"
                                  onClick={signInPageHandler}>{t('signIn')}</MyButton>
                    </div>
                    <div className={`${classes.overlayPanel} ${classes.overlayRight}`}>
                        {media ? <h1>{t('createAccount')}</h1> : <h3>{t('createAccount')}</h3>}
                        <MyButton color="primary"
                                  maxwidth="90%"
                                  variant="contained"
                                  onClick={signUpPageHandler}>{t('signUp')}</MyButton>
                    </div>
                </div>
            </div>
            {error && <SnackBar message={error} error/>}
        </div>
    )
}
