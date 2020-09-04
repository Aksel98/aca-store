import React, {useState, useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {db} from '../services/firebase/Firebase';
import uniqId from 'uniqid';
import {MyButton} from '../main/constants/constants';
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import {numberFormat} from "../main/format-numbers/NumberFormat";

const useStyles = makeStyles({
    container: {
        margin: '40px 20px'
    },
    btn: {
        width: 'fit-content',
        display: 'flex',
        justifyContent: 'end',
        marginBottom: 50
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: 'left',
        whiteSpace: 'nowrap'
    },
    body: {
        fontSize: 14,
        textAlign: 'left'
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const {t} = useTranslation()
    const history = useHistory();
    const classes = useStyles();

    function usersList() {
        db.collection('users').get().then((Snapshot) => {
            const users = [];
            Snapshot.forEach((doc) => {
                if (doc.data().orders) {
                    users.push(...doc.data().orders)
                }
            });
            setUsers(users)
        })
    }

    useEffect(() => {
        usersList();
    }, [])

    return (
        <div className={classes.container}>
            <MyButton className={classes.btn}
                      variant="contained"
                      onClick={() => history.goBack()}>{t('goBack')}</MyButton>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">{t('email')}</StyledTableCell>
                            <StyledTableCell align="right">{t('address')}</StyledTableCell>
                            <StyledTableCell align="right">{t('paymentMethod')}</StyledTableCell>
                            <StyledTableCell align="right">{t('orderPrice')}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow key={uniqId()}>
                                <StyledTableCell key={uniqId()} align="right">{user.email}</StyledTableCell>
                                <StyledTableCell key={uniqId()} align="right">{user.address}</StyledTableCell>
                                <StyledTableCell key={uniqId()} align="right">{user.payment}</StyledTableCell>
                                <StyledTableCell key={uniqId()} align="right">{numberFormat(user.price, '֏')}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
