import React, {useState} from "react"
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import {makeStyles, styled} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {BLACK} from "../main/constants/constants"
import {MyButton} from "../main/constants/constants"
import {useTranslation} from "react-i18next";
import PhoneIcon from "@material-ui/icons/Phone";
import {useHistory} from "react-router-dom";
import {signInFacebook, signInGithub, signInGoogle, signInPhoneNumber} from "../services/redux/actions/userAction";
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    signInContainer: {
        transform: props => props.rightPanel && 'translateX(100%)',
        left: '0',
        width: '50%',
        zIndex: 2,
    },
    socialContainer: {
        margin: '20px 0',
    },
    social: {
        border: props => props.media && `1px solid ${BLACK}`,
        borderRadius: '50%',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 5px',
        height: props => props.media && '40px',
        width: props => props.media && '40px',
        cursor: "pointer"
    },
    forgotPassword: {
        fontSize: '11px',
        width: '100%',
        textAlign: 'end',
        margin: '5px 0',
        cursor: 'pointer'
    },
    cursor: {
        cursor: 'pointer'
    }
})

const MyTextField = styled(TextField)({
    width: '100%',
    marginTop: '10px'
})

export default function SignIn(props) {
    const [showPassword, setShowPassword] = useState(false)
    const {email, password, error, onValueChange, signIn, classFormContainer, media} = props
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles(props)
    const {t} = useTranslation();


    return (
            <div className={`${classFormContainer} ${classes.signInContainer}`}>
                <form>
                    {media ? <h2>{t('signIn')}</h2>:  <h3>{t('signIn')}</h3>}
                    <div className={classes.socialContainer}>
                        <div onClick={() => dispatch(signInGoogle(history))} className={classes.social}><MailIcon/></div>
                        <div onClick={() => dispatch(signInFacebook(history))} className={classes.social}><FacebookIcon/></div>
                        <div onClick={() => dispatch(signInGithub(history))} className={classes.social}><GitHubIcon/></div>
                        <div onClick={() => dispatch(signInPhoneNumber(history))} className={classes.social}><PhoneIcon/></div>
                    </div>
                    <span>{t('useYourAccount')}</span>
                    <MyTextField label={`${t('email')}...`}
                                 type="email"
                                 InputProps={{endAdornment: <EmailIcon position="start"/>}}
                                 value={email}
                                 onChange={onValueChange}
                                 autoComplete="on"
                                 error={!!error}/>
                    <MyTextField label={`${t('password')}...`}
                                 type={showPassword ? 'text' : 'password'}
                                 InputProps={{
                                     endAdornment: (
                                         <div className={classes.cursor}> {showPassword ?
                                             <VisibilityIcon position="start" onClick={() => setShowPassword(!showPassword)}/> :
                                             <VisibilityOffIcon position="start"
                                                                onClick={() => setShowPassword(!showPassword)}/>}
                                         </div>)
                                 }}
                                 value={password}
                                 onChange={onValueChange}
                                 autoComplete="off"
                                 error={!!error}/>
                    <div className={classes.forgotPassword}>{t('forgotPassword')}</div>
                    <MyButton color="primary"
                              variant="contained"
                              disabled={!email || !password}
                              onClick={signIn}>{t('signIn')}</MyButton>
                </form>
        </div>
    )
}
