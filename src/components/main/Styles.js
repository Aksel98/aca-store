import {styled} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const BLACK = '#070506';
export const WHITE = 'white';
export const ORANGE = '#cf8600'
export const BLUE = 'linear-gradient(to right, #02bbec, #0642ba) no-repeat 0 0 / cover'
export const GREY = 'rgb(197, 197, 197)';
export const LIGHTGREY = 'rgba(228, 228, 228, 0.7)';
export const PURPLE = '#942FB8';

export const MyButton = styled(Button)({
    width: '100%',
    maxWidth: '90%',
    '&:disabled': {
        border: `1px solid ${BLACK}`
    }
})
