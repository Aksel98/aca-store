import React, {useState} from "react";
import {makeStyles, styled} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from '@material-ui/icons/Phone';
import {BLACK, MyButton} from "../main/Styles";
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {useTranslation} from "react-i18next";
import {signInFacebook, signInGithub, signInGoogle, signInPhoneNumber} from "../api/SignInPopups";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    signUpContainer: {
        transform: props => props.rightPanel && 'translateX(100%)',
        opacity: props => props.rightPanel ? 1 : 0,
        zIndex: props => props.rightPanel ? 3 : 1,
        left: 0,
        width: '50%'
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
    cursor: {
        cursor: 'pointer'
    }
})

const MyTextField = styled(TextField)({
    width: '100%',
    marginTop: '10px'
})

const MyBtn = styled(MyButton)({
    margin: '20px 0'
})

export default function SignUp(props) {
    const [showPassword, setShowPassword] = useState(false)
    const {email, password, error, onValueChange, signUp, signInProvider, rightPanel, classFormContainer, media} = props
    const history = useHistory()
    const classes = useStyles({rightPanel, media})
    const {t} = useTranslation()

    return (
            <div className={`${classFormContainer} ${classes.signUpContainer}`}>
                <form>
                    {media ? <h2>{t('createAccount')}</h2> : <h3>{t('createAccount')}</h3>}
                    <div className={classes.socialContainer}>
                        <div onClick={() => signInGoogle(history)} className={classes.social}><MailIcon/></div>
                        <div onClick={() => signInFacebook(history)} className={classes.social}><FacebookIcon/></div>
                        <div onClick={() => signInGithub(history)} className={classes.social}><GitHubIcon/></div>
                        <div onClick={() => signInPhoneNumber(history)} className={classes.social}><PhoneIcon/></div>
                    </div>
                    <span>{t('useYourEmailForRegistration')}</span>
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
                                             <VisibilityIcon position="start"
                                                             onClick={() => setShowPassword(!showPassword)}/> :
                                             <VisibilityOffIcon position="start"
                                                                onClick={() => setShowPassword(!showPassword)}/>}
                                         </div>)
                                 }}
                                 value={password}
                                 onChange={onValueChange}
                                 autoComplete="off"
                                 error={!!error}/>
                    <MyBtn color="primary"
                           variant="contained"
                           disabled={!email || !password}
                           onClick={signUp}>{t('signUp')}</MyBtn>
                </form>
        </div>
    )
}
