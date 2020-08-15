import NumberFormat from "react-number-format";
import React from "react";

export function numberFormat(value, suffix) {
    return <NumberFormat value={value} displayType={'text'} thousandSeparator={true} suffix={suffix}/>
}
