import {styled} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const BLACK = '#070506';
export const WHITE = 'white';
export const ORANGE = 'linear-gradient(to right, #02bbec, #0642ba) no-repeat 0 0 / cover'

export const MyButton = styled(Button)({
    width: '100%',
    maxWidth: '80%',
    '&:disabled': {
        border: `1px solid ${BLACK}`
    }
})
