import React, { useState, useEffect } from "react";

import "../Styles/home.css";
import Quicksearchitem from "./Quicksearchitem";


import axios from "axios";
import {useNavigate } from "react-router-dom";

const Quicksearch = () => {

  const [mealType, setMealType] = useState([]);
  let navigation=useNavigate();
 

  useEffect(() => {

    axios.get("http://127.0.0.1:1900/getMealType")
      .then((response) =>
        setMealType(response.data.Data),
      )
      .catch(err => err)
  })

  const handleMealTypeFilter = (obj) => {
    const locationid=sessionStorage.getItem('location_id')

    if(locationid){
      navigation(`/filter?mealtype=${obj.meal_type}&location=${locationid}`)
    }else{
      navigation(`/filter?mealtype=${obj.meal_type}`)
  }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="d-flex flex-column p-2 m-3">
            <h1>Quick Search</h1>
            <h3>Discover restaurants by type of meal</h3>
          </div>
          <br />

          <div className="container" >
            <div className="row">
              {mealType.map((e, i) => {
                return <div onClick={()=>handleMealTypeFilter(e)} className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12 p-4 shadow-lg p-3">
                  <Quicksearchitem img={e.image} detail={e.content} name={e.name} />
                </div>
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}


export default Quicksearch;