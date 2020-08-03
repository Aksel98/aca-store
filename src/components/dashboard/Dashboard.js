import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Carousel from "./Carousel";
import CategoryList from "./CategoryList";



export default function Dashboard() {
    return (
        <div>
            <Header />
            <Carousel />
            <CategoryList />
            <Footer />
        </div>
    )
}
