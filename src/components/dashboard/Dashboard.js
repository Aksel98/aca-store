import React from "react";
import Header from "./Header";
import SnackBar from "../main/SnackBar";
import Footer from "./Footer";
import Carousel from "./Carousel";

export default function Dashboard() {
    return (
        <div>
            <Header />
            <Carousel />
            <Footer />
        </div>
    )
}
