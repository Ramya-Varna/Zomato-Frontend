// import React, { useEffect, useState } from "react";
// import "../Styles/Filter.css";
// import axios from 'axios';
// import queryString from 'query-string';
// import { useLocation, useNavigate } from "react-router-dom";

// const Filter = () => {
//     const navigate = useNavigate()
//     const [restaurants, setRestaurants] = useState([]);
//     const [locationData, setLocationData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1)
//     const restaurantsPerPage = 2
//     const [sort, setSort] = useState(1)
//     const [cuisineid, setCuisineid] = useState([])
//     const [lcost, setLcost] = useState(undefined);
//     const [hcost, setHcost] = useState(undefined)

//     const location = useLocation().search
//     const parseQuery = queryString.parse(window.location.search)
//     const mealtype_id = parseQuery.mealtype;
//     console.log(mealtype_id)
//     const location_id = Number(sessionStorage.getItem("locationId"));
//     console.log(location_id)

//     const fetchLocation = () => {
//         axios.get("http://localhost:1900/getLocation")
//             .then((res) => setRestaurants(res.data.Data),
//                 console.log(restaurants)
//             )
//             .catch((err) => console.log(err))
//     }



//     useEffect(() => {
//         fetchLocation();

//         const filteredObj = {
//             mealtype_id: Number(mealtype_id),
//             location_id: location_id,
//             cuisineid: cuisineid,
//             sort: sort,
//             lcost: lcost,
//             hcost: hcost
//         }

//         axios.post("http://localhost:1900/filter", filteredObj)
//             .then(res => setLocationData(res.data))
//             .catch(err => err);

//     }, [sort, cuisineid, lcost, hcost, location_id, mealtype_id])

//     const searchHandle = (e) => {
//         var locationids = Number(e.target.value);
//         const filteredObj = {
//             mealtype_id: Number(mealtype_id),
//             location_id: locationids,
//             sort: sort,
//             lcost: lcost,
//             hcost: hcost
//         }

//         axios.post("http://localhost:1900/filter", filteredObj)
//             .then(res => setLocationData(res.data))
//             .catch(err => err)
//     }

//     const handleCuisine = (id) => {

//         const index = cuisineid.indexOf(id)
//         if (index === -1) {
//             cuisineid.push(id)
//             setCuisineid(cuisineid)
//             console.log(cuisineid)
//         } else {
//             cuisineid.splice(index, 1)
//             setCuisineid(cuisineid)
//         }
//         setTimeout(() => {
//             filters();
//         }, 0);
//     }

//     const handleSort = (event) => {

//         const sort = event.target.value
//         setSort(sort)
//         setTimeout(() => {
//             filters();
//         }, 0);
//     }

//     const handleCost = (lcost, hcost) => {

//         setLcost(lcost)
//         setHcost(hcost)
//         setTimeout(() => {
//             filters();
//         }, 0);
//     }

//     const filters = () => {
//             const filteredObj = {
//                 mealtype_id: Number(mealtype_id),
//                 location_id: location_id,
//                 cuisine_id: cuisineid,
//                 sort: sort,
//                 lcost: lcost,
//                 hcost: hcost
//             }
    
//             axios.post("http://localhost:1900/filter", filteredObj)
//                 .then(res => setLocationData(res.data))
//                 .catch(err => err)
//         }

//     const handlePage = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const indexofLastRestaurant = currentPage * restaurantsPerPage;
//     const indexofFirstRestaurant = indexofLastRestaurant - restaurantsPerPage;
//     const length = Math.ceil(locationData.length / restaurantsPerPage);
//     const currentRestaurants = locationData.length > 0 ?locationData.slice(indexofFirstRestaurant, indexofLastRestaurant) : 0;
//     console.log(currentRestaurants);

//     const handleDetail = (e) => {
//         navigate(`/Detail?restaurant=${e._id}`)
//     }

//     // const handleCuisine=(cuisine)=>{
//     //    if(selectedCuisines.includes(cuisine)){
//     //     setSelectedCuisines(selectedCuisines.filter((item)=>item!==cuisine));
//     //    }else{
//     //     setSelectedCuisines([...selectedCuisines, cuisine]);
//     //    }
//     // }

//     // const generatedresult= () => {
//     //     console.log('Selected Cuisines:', selectedCuisines);
//     // }

//     return (
//         <div>

//             <div className="container Fsearchplaz">Breakfast Places in Mumbai</div>

//             <div className="col-xl-12 col-lg-0 col-md-0 col-sm-0 col-xs-0 Ffilterpanel">

//                 <div className="Ftitle">
//                     <h3>Filters</h3>
//                 </div>
//                 <div className="Fheading"><h4>Select Location</h4> </div>
//                 <div className="Flocationselector">
//                     <select className="FlocationSelection" onChange={searchHandle}>
//                         <option>--Select City--</option>
//                         {restaurants.map((e) => {
//                             return (
                               
//                             <option key={e._id} value={e.location_id}>{`${e.city} - ${e.name}`}</option>
//                             // console.log(locationData);
//                             )
                            
//                         })}

//                     </select>

//                 </div>
//                 <br />

//                 <div className="Fhide">

//                     <div className="Fheading" >Cuisine</div><br />
//                     <input type="checkbox" onChange={() => handleCuisine(1)} className="Foption" />North Indian<br />
//                     <input type="checkbox" onChange={() => handleCuisine(2)} className="Foption" />South Indian<br />
//                     <input type="checkbox" onChange={() => handleCuisine(3)} className="Foption" />Korean<br />
//                     <input type="checkbox" onChange={() => handleCuisine(4)} className="Foption" />Chinese<br />
//                     <input type="checkbox" onChange={() => handleCuisine(5)} className="Foption" />Chat Masala<br /><br />

//                     <div className="Fheading">Cost For Two</div><br />
//                     <input type="radio" className="rcost" name="cost" onChange={() => handleCost(0, 500)} />Less than `500<br />
//                     <input type="radio" className="rcost" name="cost" onChange={() => handleCost(500, 1000)} />`500 to `1000<br />
//                     <input type="radio" className="rcost" name="cost" onChange={() => handleCost(1000, 1500)} />`1000 to `1500<br />
//                     <input type="radio" className="rcost" name="cost" onChange={() => handleCost(1500, 2000)} />`1500 to `2000<br />
//                     <input type="radio" className="rcost" name="cost" onChange={() => handleCost(2000, 50000)} />`2000+<br /><br />

//                     <div className="Fheading">Sort</div><br />
//                     <input type="radio" className="rcost" name="price" id="" value={1} onClick={handleSort} />Price low to high<br />
//                     <input type="radio" className="rcost" name="price" id="" value={-1} onClick={handleSort} />Price high to low
//                 </div>
//             </div>

//             <div className="Fmenu">

//                 {currentRestaurants.length > 0 ? currentRestaurants.map((item, i) => {
//                     // console.log(currentRestaurants);

//                     return <div className="Fmenu1" key={i} onClick={() => handleDetail(item)}>
//                         <img src={item.image} className="Fimage" alt="Menu-Item Image" style={{
//                             width: "150px ",
//                             height: "100px"
//                         }} />
//                         {/* <image src={require("../Assets/img1.png")} className="Fimage" alt="no search result found" /> */}
//                         <h2 className="Fh2">{item.name}</h2>
//                         <h5 className="Fh5">{item.locality}</h5>
//                         <p className="Fp">{item.city}</p>
//                         <hr />
//                         <div className="Fmrp">
//                             <div className="Fcusin">CUISINE <b>:{` ${item.cuisine.map(eItem => eItem.name + " ")}`} </b> </div><br />
//                             <div className="Famt">COST FOR TWO <b>:&#8377;{item.min_price}</b> </div>
//                         </div>
//                     </div>

//                 }) : <div class="nosearch" style={{ color: "red" }}>No Search is found...</div>}
//                 {/* <h1 style={{color:"red"}}No result Found... </h1> */}

//             </div><br />

//             {locationData.length > 0 ?

//                 <div className="Fbutton">

//                     {Array.from({ length }).map((_, index) => (
//                         <p key={index}
//                             className={`page-item ${currentPage === index + 1 ? "active" : ' '} btn border-primary btn-light`}
//                             onClick={() => handlePage(index + 1)}>

//                             <span className="page-link">{index + 1}</span>
//                         </p>

//                     ))}

//                 </div> : null}
//                 </div>
//                 )
//                 }
//                 export default Filter;


import React, { useEffect, useState } from "react";
import "../Styles/Filter.css";
import axios from 'axios';
import queryString from 'query-string';
import { useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
    const navigate = useNavigate()
    const [restaurants, setRestaurants] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const restaurantsPerPage = 2
    const [sort, setSort] = useState(1)
    const [cuisineid, setCuisineid] = useState([])
    const [lcost, setLcost] = useState(undefined);
    const [hcost, setHcost] = useState(undefined)

    const location = useLocation().search
    const parseQuery = queryString.parse(window.location.search)
    const mealtype_id = parseQuery.mealtype;
    const location_id = Number(sessionStorage.getItem("locationId"));

    const fetchLocation = () => {
        axios.get("http://localhost:1900/getLocation")
            .then((res) => {
                setRestaurants(res.data.Data);
                filters(); // Call filters after getting location data
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchLocation();

        const filteredObj = {
            mealtype_id: Number(mealtype_id),
            location_id: location_id,
            cuisineid: cuisineid,
            sort: sort,
            lcost: lcost,
            hcost: hcost
        }

        axios.post("http://localhost:1900/filter", filteredObj)
            .then(res => setLocationData(res.data))
            .catch(err => err);

    }, [sort, cuisineid, lcost, hcost, location_id, mealtype_id, restaurants]);

    const searchHandle = (e) => {
        var locationids = Number(e.target.value);
        const filteredObj = {
            mealtype_id: Number(mealtype_id),
            location_id: locationids,
            sort: sort,
            lcost: lcost,
            hcost: hcost
        }

        axios.post("http://localhost:1900/filter", filteredObj)
            .then(res => setLocationData(res.data))
            .catch(err => err)
    }

    const handleCuisine = (id) => {
        const index = cuisineid.indexOf(id)
        if (index === -1) {
            cuisineid.push(id)
            setCuisineid([...cuisineid]); // Use spread to create a new array
        } else {
            cuisineid.splice(index, 1)
            setCuisineid([...cuisineid]);
        }
        setTimeout(() => {
            filters();
        }, 0);
    }

    const handleSort = (event) => {
        const newSort = Number(event.target.value);
        setSort(newSort);
        setTimeout(() => {
            filters();
        }, 0);
    }

    const handleCost = (lcost, hcost) => {
        setLcost(lcost)
        setHcost(hcost)
        setTimeout(() => {
            filters();
        }, 0);
    }

    const filters = () => {
        const filteredObj = {
            mealtype_id: Number(mealtype_id),
            location_id: location_id,
            cuisine_id: cuisineid,
            sort: sort,
            lcost: lcost,
            hcost: hcost
        }

        axios.post("http://localhost:1900/filter", filteredObj)
            .then(res => setLocationData(res.data))
            .catch(err => err)
    }

    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexofLastRestaurant = currentPage * restaurantsPerPage;
    const indexofFirstRestaurant = indexofLastRestaurant - restaurantsPerPage;
    const length = Math.ceil(locationData.length / restaurantsPerPage);
    const currentRestaurants = locationData.length > 0 ? locationData.slice(indexofFirstRestaurant, indexofLastRestaurant) : [];
    
    const handleDetail = (e) => {
        navigate(`/Detail?restaurant=${e._id}`)
    }

    return (
        <div>
            <div className="container Fsearchplaz">Breakfast Places in Mumbai</div>

             <div className="col-xl-12 col-lg-0 col-md-0 col-sm-0 col-xs-0 Ffilterpanel">

                <div className="Ftitle">
                    <h3>Filters</h3>
                 </div>
                 <div className="Fheading"><h4>Select Location</h4> </div>
                 <div className="Flocationselector">
                     <select className="FlocationSelection" onChange={searchHandle}>
                      <option>--Select City--</option>
                        {restaurants.map((e) => {
                            return (
                               
                            <option key={e._id} value={e.location_id}>{`${e.city} - ${e.name}`}</option>
                            // console.log(locationData);
                            )
                            
                        })}

                    </select>

                </div>
                <br />

                <div className="Fhide">

                    <div className="Fheading" >Cuisine</div><br />
                    <input type="checkbox" onChange={() => handleCuisine(1)} className="Foption" />North Indian<br />
                    <input type="checkbox" onChange={() => handleCuisine(2)} className="Foption" />South Indian<br />
                    <input type="checkbox" onChange={() => handleCuisine(3)} className="Foption" />Korean<br />
                    <input type="checkbox" onChange={() => handleCuisine(4)} className="Foption" />Chinese<br />
                    <input type="checkbox" onChange={() => handleCuisine(5)} className="Foption" />Chat Masala<br /><br />

                    <div className="Fheading">Cost For Two</div><br />
                    <input type="radio" className="rcost" name="cost" onChange={() => handleCost(0, 500)} />Less than `500<br />
                    <input type="radio" className="rcost" name="cost" onChange={() => handleCost(500, 1000)} />`500 to `1000<br />
                    <input type="radio" className="rcost" name="cost" onChange={() => handleCost(1000, 1500)} />`1000 to `1500<br />
                    <input type="radio" className="rcost" name="cost" onChange={() => handleCost(1500, 2000)} />`1500 to `2000<br />
                    <input type="radio" className="rcost" name="cost" onChange={() => handleCost(2000, 50000)} />`2000+<br /><br />

                    <div className="Fheading">Sort</div><br />
                    <input type="radio" className="rcost" name="price" id="" value={1} onClick={handleSort} />Price low to high<br />
                    <input type="radio" className="rcost" name="price" id="" value={-1} onClick={handleSort} />Price high to low
                </div>
            </div>

            <div className="Fmenu">

                {currentRestaurants.length > 0 ? currentRestaurants.map((item, i) => {
                    // console.log(currentRestaurants);

                    return <div className="Fmenu1" key={i} onClick={() => handleDetail(item)}>
                        <img src={item.image} className="Fimage" alt="Menu-Item Image" style={{
                            width: "150px ",
                            height: "100px"
                        }} />
                        {/* <image src={require("../Assets/img1.png")} className="Fimage" alt="no search result found" /> */}
                        <h2 className="Fh2">{item.name}</h2>
                        <h5 className="Fh5">{item.locality}</h5>
                        <p className="Fp">{item.city}</p>
                        <hr />
                        <div className="Fmrp">
                            <div className="Fcusin">CUISINE <b>:{` ${item.cuisine.map(eItem => eItem.name + " ")}`} </b> </div><br />
                            <div className="Famt">COST FOR TWO <b>:&#8377;{item.min_price}</b> </div>
                        </div>
                    </div>

                }) : <div class="nosearch" style={{ color: "red" }}>No Search is found...</div>}
                {/* <h1 style={{color:"red"}}No result Found... </h1> */}

            </div><br />

             {locationData.length > 0 ?

                <div className="Fbutton">

                    {Array.from({ length }).map((_, index) => (
                        <p key={index}
                            className={`page-item ${currentPage === index + 1 ? "active" : ' '} btn border-primary btn-light`}
                            onClick={() => handlePage(index + 1)}>

                            <span className="page-link">{index + 1}</span>
                        </p>

                    ))}

                </div> : null}
        </div>
    );
}

export default Filter;

           

