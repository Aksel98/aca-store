import React, {useState} from "react"
import PersonIcon from '@material-ui/icons/Person'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {makeStyles, styled} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
    cursor: {
        cursor: 'pointer'
    }
}))

const MyButton = styled(Button)({
    width: '100%'
})

const MyTextField = styled(TextField)({
    width: '100%',
    margin: '10px 0'
})

export default function SignIn(props) {

    const [showPassword, setShowPassword] = useState(false)
    const {error, email, password, signIn} = props
    const classes = useStyles()

    return (
        <div>
            <MyTextField label="Email..."
                         type="email"
                         InputProps={{endAdornment: <PersonIcon position="start"/>}}
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
                                     <VisibilityOffIcon position="start" onClick={() => setShowPassword(!showPassword)}/>}
                                 </div>)
                         }}
                         value={password.value}
                         onChange={password.onChange}
                         autoComplete="off"
                         error={!!error}
                         helperText={error}/>
            <MyButton color="primary"
                      variant="contained"
                      disabled={!email.value || !password.value}
                      onClick={signIn}>Sign in</MyButton>
        </div>
    )
}
