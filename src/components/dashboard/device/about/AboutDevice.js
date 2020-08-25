import React from "react";
import MainParameters from "./MainParameters";

export default function AboutDevice(props) {
    const {device} = props
    const inputRef_1 = React.createRef()
    const inputRef_2 = React.createRef()
    const inputRef_3 = React.createRef()
    const inputRef_4 = React.createRef()

    return (
        <React.Fragment>
            <MainParameters parameter={device.ram} name={'ram'} refs={inputRef_1}/>
            <MainParameters parameter={device.memory} name={'memory'} refs={inputRef_2}/>
            <MainParameters parameter={device.year} name={'year'} refs={inputRef_3}/>
            <MainParameters parameter={device.color} name={'color'} refs={inputRef_4}/>
        </React.Fragment>
    )
}
