import React, {useState} from "react"
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import {makeStyles, styled} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {BLACK} from "../main/Styles";
import {MyButton} from "../main/Styles"

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
    const {error, email, password, signIn, classFormContainer, media} = props
    const classes = useStyles(props)

    return (
            <div className={`${classFormContainer} ${classes.signInContainer}`}>
                <form>
                    {media ? <h1>Sign in</h1>:  <h3>Sign in</h3>}
                    <div className={classes.socialContainer}>
                        <a className={classes.social}><FacebookIcon/></a>
                        <a className={classes.social}><GitHubIcon/></a>
                        <a className={classes.social}><MailIcon/></a>
                    </div>
                    <span>or use your account</span>
                    <MyTextField label="Email..."
                                 type="email"
                                 InputProps={{endAdornment: <EmailIcon position="start"/>}}
                                 value={email.value}
                                 onChange={email.onChange}
                                 autoComplete="on"
                                 error={!!error}
                                 helperText={error}/>
                    <MyTextField label="Password..."
                                 type={showPassword ? 'text' : 'password'}
                                 InputProps={{
                                     endAdornment: (
                                         <div className={classes.cursor}> {showPassword ?
                                             <VisibilityIcon position="start" onClick={() => setShowPassword(!showPassword)}/> :
                                             <VisibilityOffIcon position="start"
                                                                onClick={() => setShowPassword(!showPassword)}/>}
                                         </div>)
                                 }}
                                 value={password.value}
                                 onChange={password.onChange}
                                 autoComplete="off"
                                 error={!!error}
                                 helperText={error}/>
                    <div className={classes.forgotPassword}>Forgot your password?</div>
                    <MyButton color="primary"
                              variant="contained"
                              disabled={!email.value || !password.value}
                              onClick={signIn}>Sign in</MyButton>
                </form>
        </div>
    )
}
