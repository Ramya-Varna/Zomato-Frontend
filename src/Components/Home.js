import React, { useEffect, useState } from "react";
import "../Styles/home.css";
import Wallpaper from "./Wallpaper";
import Quicksearch from "./Quicksearch";
import axios from "axios";

const Home = () => {
   
   return (
     
      <>
         <Wallpaper />
         <Quicksearch />
      </>
   )
};

export default Home;