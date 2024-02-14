import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate, useNavigate } from "react-router-dom";

import "../Styles/Wallpaper.css";

const Wallpaper = () => {
    let navigation = useNavigate();
    let [restaurants, setRestaurants] = useState([]);
    const [inputText, setInputText] = useState("");
    const [location, setLocation] = useState([]);
    // let [handleLocation, setHandleLocation] = useState([]);
    // let [handleSearch, setHandleSearch] = useState("");
    let [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        axios.get("https://outstanding-fish-pleat.cyclic.app/getLocation")
            .then((res) => {
                setRestaurants(res.data.Data);
                console.log(res.data.Data);
            })
            .catch((err) => console.log(err));
    
        axios.get("https://outstanding-fish-pleat.cyclic.app/getRestaurantData")
            .then((response) => {
                setRestaurants(response.data.Data);
                //console.log(restaurants)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    
    // ...
    
    const handleLocation = (event) => {
        let locationid = event.target.value;
        axios.get(`https://outstanding-fish-pleat.cyclic.app/getRestaurantBylocation_id/${locationid}`)
            .then(response => {
                setLocation(response.data);
                console.log(location);
                sessionStorage.setItem('location_id', locationid);
            })
            .catch((error) => {
                console.error("Error fetching location data:", error);
            });
    };
    const handleSearch = (event) => {
        let inputText = event.target.value;

        var suggest = restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        setInputText(inputText);
        setSuggestions(suggest);
    }

    const filteredsuggest = (obj) => {
        navigation(`/detail?restaurant=${obj._id}`)
    }

    const showSuggestions = () => {

        if (suggestions.length === 0 && inputText === undefined) {
            return null;
        }
        if (suggestions.length > 0 && inputText ==='') {
            return null;
        }
        if (suggestions.length === 0 && inputText) {
            return <ul>
                <li>No Search Results Found</li>
            </ul>
        }

        return (
            <ul className="unorder justify-content-center ">
                {
                    suggestions.map((e, i) => (<li className="list border rounded-2 p-3 fw-normal border border-3 text-center text-light bg-primary text-white justify-content-space-around " 
                                    onClick={() => filteredsuggest(e)} key={e._id} >{`${e.name}-${e.locality},${e.city}`}</li>)

                    )}
            </ul>
        );
    }

    return (

        <div>
            <div className='bgimg'>
                <div className="d-flex flex-column text-center justify-content-end">
                    {/* <div className="logo" style={{marginLeft:"45%"}}>e!</div> */}
                    <div className="logo xs-12">POT 2 PLATE</div>
                    <h1 className="find">Find the best restaurants cafes and bars</h1>
                    <div className="px-2">
                        <select className="locationDropdown" onChange={handleLocation}>
                            <option>select city</option>
                            {/* {restaurants.map((e, i) => {
                                return <option key={i} value={e.location_id}>{`${e.city}-${e.locality}`}</option>
                            })} */}
                            {location.map((e) => {
                            return (
                               
                            <option key={e._id} value={e.location_id}>{`${e.city} - ${e.name}`}</option>
                            // console.log(locationData);
                            )
                            
                        })}

                            {/* where e denotes location */}
                        </select>
                        <input type="search" className="border rounded-3 px-4 gap-2" onChange={handleSearch} placeholder="Search the restaurant" id="search" />
                        {showSuggestions()}
                        {/* {setShowSuggestions()} */}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Wallpaper;


