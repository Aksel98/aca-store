import React, {useEffect, useState,} from 'react';
import {useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import uniqId from 'uniqid';
import {db} from "../../services/firebase/Firebase";
import TextField from '@material-ui/core/TextField';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {MyButton, ORANGE, BLUE} from "../../main/constants/Constants";
import {numberFormat} from "../../main/format-numbers/NumberFormat";
import {useMediaQuery} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {removeFromBasket} from "../../services/redux/actions/basketAction";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "60%",
        marginTop: "60px",
        margin: "auto",
    },
    confirmIconBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: ORANGE,
    },
    confirmIconText: {
        fontSize: "20px"
    },
    tableRow: {
        display: "flex",
        justifyContent: "space-around",
        borderBottom: `1px solid ${ORANGE}`,
        textAlign: "center",
    },
    tableRowTitle: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        color: ORANGE,
        fontSize: "16px",
        borderRight: `1px dotted ${ORANGE}`,
        borderLeft: `1px dotted ${BLUE}`,
        borderTop: `1px solid ${ORANGE}`,
    },
    collParam: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        color: "grey",
        fontWeight: "900",
        fontSize: "16px",
        borderRight: `1px dotted ${ORANGE}`,
        borderLeft: `1px dotted ${BLUE}`,
        padding: "10px 5px"
    },

    tableRowItemName: {
        width: "100%",
        textAlign: "end",
        fontWeight: 900,
        padding: "10px 5px"
    },
    tableRowItemValue: {
        width: "50%",
        textAlign: "end",
        fontWeight: 900,
        padding: "10px 5px"
    },
    methods: {
        display: "flex",
        justifyContent: "center",
        padding: "20px"
    },
    shippingMetods: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
    },
    paymentMetods: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
    },
    shippingIcom: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: ORANGE,
    },
    paymentIcon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: ORANGE,
    },
    methodsTitle: {
        paddingLeft: "5px"
    },
    transfersInfo: {
        display: "flex",
        margin: "20px 0px"
    },
    infoTitle: {
        color: ORANGE,
        margin: 0
    },
    infoText: {
        margin: "0px"
    },
    confirmBtn: {
        width: "40%"
    },
    transfersInfoblock: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    transfersInfobtn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
})

export default function Payment() {
    const [state, setState] = useState({country: '', name: ' ',});
    const [value, setValue] = useState("5000");
    const [valuePayment, setValuePayment] = useState("bank");
    const [chosenItems, setChosenItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const basket = useSelector(state => state.basket);
    const dispatch = useDispatch()
    const media = useMediaQuery('(max-width:1300px)');
    const classes = useStyles(media);
    const location = useLocation()

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        setSubTotal(chosenItems.map((item, ind) => {
            return item.price * location.state.quantity[ind]
        }).reduce((acc, Value) => (acc + Value), 0))
    }, [chosenItems])

    const getCartItems = () => {
        const basketIds = basket.map(item => item.id)
        if (basketIds.length) {
            try {
                db.collection('product').where('id', 'in', basketIds).get().then(querySnapshot => {
                    const tempArr = [];
                    querySnapshot.docs.forEach(doc => {
                        let tempObj = doc.data();
                        tempArr.push({...tempObj});
                    })
                    setChosenItems(tempArr);
                }).catch(err => console.log('error making basket info query', err));
            } catch (e) {
                console.log("can not  get basket items:", e);
            }
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChange1 = (event) => {
        setValuePayment(event.target.value);
    };

    const handleChange2 = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        })
    };

    const removeItem = (id) => {
        let tempArr = [...chosenItems];
        tempArr = tempArr.filter(objItem => (objItem.id !== id))
        setChosenItems(tempArr);
        dispatch(removeFromBasket(id))
    }

    return (
        <div className={classes.container}>
            <div className={classes.confirmIconBlock}>
                <ConfirmationNumberOutlinedIcon/>
                <h1 className={classes.confirmIconText}>CONFIRM YOUR ORDER</h1>
            </div>
            <div className={classes.tableRow}>
                <h2 className={classes.tableRowTitle}>Product Name</h2>
                <h2 className={classes.tableRowTitle}>Model</h2>
                <h2 className={classes.tableRowTitle}>Quantity</h2>
                <h2 className={classes.tableRowTitle}>Price</h2>
                <h2 className={classes.tableRowTitle}>Total</h2>
                <h2 className={classes.tableRowTitle}>Action</h2>
            </div>
            <div>{!basket ? 'you have 0 items in your cart' : chosenItems.map((item, ind) =>
                <div key={uniqId} className={classes.tableRow}>
                    <span className={classes.collParam}> {item.device}</span>
                    <span className={classes.collParam}> {item.model}</span>
                    <span className={classes.collParam}> {location.state.quantity[ind]} </span>
                    <span className={classes.collParam}> {numberFormat(Math.ceil(item.price), ' ֏')}</span>
                    <span
                        className={classes.collParam}> {numberFormat(Math.ceil(item.price * location.state.quantity[ind]), ' ֏')}</span>
                    <span className={classes.collParam}> <MyButton onClick={() => removeItem(item.id)}
                                                                   newcolor={ORANGE}
                                                                   variant="contained">Remove</MyButton></span>
                </div>)}
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>Sub-Total</span>
                <span className={classes.tableRowItemValue}>{numberFormat(Math.ceil(subTotal), ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>VAT 20%</span>
                <span className={classes.tableRowItemValue}> {numberFormat(Math.ceil(subTotal * 0.2), ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>Sipping Rate</span>
                <span className={classes.tableRowItemValue}>{numberFormat(Math.ceil(value), ' ֏')}</span>
            </div>
            <div className={classes.tableRow}>
                <span className={classes.tableRowItemName}>Total</span>
                <span
                    className={classes.tableRowItemValue}> {numberFormat(Math.ceil(+value + subTotal * 1.2), ' ֏')}</span>
            </div>
            <div className={classes.methods}>
                <div className={classes.shippingMetods}>
                    <span className={classes.shippingIcom}>
                        <LocalShippingIcon/>
                        <h2 className={classes.methodsTitle}>SHIPPING METHOD</h2>
                    </span>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Shipping rate</FormLabel>
                        <RadioGroup aria-label="shipping" name="shipping" value={value} onChange={handleChange}>
                            <FormControlLabel value="5000" control={<Radio color="primary"/>}
                                              label="Custom shipping metod 5,000 ֏"/>
                            <FormControlLabel value="10000" control={<Radio color="primary"/>}
                                              label="FedEx 2 day  10,000 ֏"/>
                            <FormControlLabel value="12000" control={<Radio color="primary"/>}
                                              label="UPS 3 day 12,000 ֏"/>
                            <FormControlLabel value="18000" control={<Radio color="primary"/>}
                                              label="USPS Media mail 1 day 18,000 ֏"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.paymentMetods}>
                    <span className={classes.paymentIcon}>
                        <AccountBalanceIcon/>
                        <h2 className={classes.methodsTitle}>PAYMENT METHOD</h2>
                    </span>
                    <FormControl>
                        <RadioGroup aria-label="payment" name="payment" value={valuePayment}
                                    onChange={handleChange1}>
                            <FormControlLabel value="bank" control={<Radio color="primary"/>}
                                              label="Bank Transfer"/>
                            <FormControlLabel value="cashe" control={<Radio color="primary"/>}
                                              label="Cashe on delivery"/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className={classes.transfersInfo}>
                <div className={classes.transfersInfoblock}>
                    <h2 className={classes.infoTitle}>BANK TRANSFER INSTRUCTIONS</h2>
                    <p className={classes.infoText}>Bank Name: Ameriabank</p>
                    <p className={classes.infoText}>SWIFT / BIC: ARMIAM22</p>
                    <p className={classes.infoText}>a/c: 103002101576</p>
                    <p className={classes.infoText}>Addres: 2 Vazgen Sargsyan Str., Yerevan, Republic of Armenia</p>
                    <p className={classes.infoText}>Your Order will not ship until we receive payment.</p>
                </div>
                <div className={classes.transfersInfobtn}>

                    <MyButton className={classes.confirmBtn} newcolor={ORANGE} variant="contained">Confirm
                        order</MyButton>
                </div>
                <div className={classes.transfersInfoblock}>
                    <h2 className={classes.infoTitle}>SHIPPING ADDRESS</h2>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="country-native-required">Country</InputLabel>
                        <Select
                            native
                            value={state.country}
                            onChange={handleChange2}
                            name="country"
                            inputProps={{
                                id: 'country-native-required',
                            }}
                        >
                            <option aria-label="None" value=""/>
                            <option value={10}>Armenia</option>
                            <option value={20}>Georgia</option>
                            <option value={30}>iran</option>
                            <option value={40}>Russia</option>
                            <option value={50}>United Kingdom</option>
                            <option value={60}>United States</option>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        id="city"
                        label="City"
                        placeholder="eg. Yerevan"
                    />
                    <TextField
                        required
                        id="address1"
                        label="Address Line 1"
                        placeholder="Street address, company name"
                    />
                    <TextField
                        required
                        id="zip"
                        label="Zip"
                        placeholder="eg. 1520"
                    />
                </div>
            </div>
        </div>
    )
}
