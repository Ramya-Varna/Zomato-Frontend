import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Filter from "./Filter";
import Details from "./Details";
import Header from "./Header";

// import { Router } from "react-router-dom/cjs/react-router-dom.min";

function Router() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>

                    <Route exact path="/" element={<Home />} />
                    <Route path="/Filter" element={<Filter />} />
                    <Route path="/Detail" element={<Details />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Router;