import NumberFormat from "react-number-format";
import React from "react";

export function numberFormat(value, suffix, displayType = 'text') {

    return <NumberFormat value={value}
                         displayType={displayType}
                         thousandSeparator={true}
                         suffix={suffix}/>
}
