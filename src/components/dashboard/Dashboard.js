import React from "react";
import Header from "./Header";
import Carousel from "./Header-carousel";
import SnackBar from "../main/SnackBar";

export default function Dashboard() {
    return (
        <div>
            <Header />
            <Carousel />
            <SnackBar message="Hello snackBar"/>
        </div>
    )
}
