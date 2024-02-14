import React from "react";

import "../Styles/home.css";

const Quicksearchitem = (props) => {
    return (
        <div>
        
                <div className="d-flex border border-4 rounded-3 shadow bg-body rounded">
                    <img src={props.img} alt="food image" height={"150px"} width={"150px"}/>
                    <div className="px-2 py-4">
                        <h4 className="title">{props.name}</h4>
                        <h6 className="detail">{props.detail}</h6>
                    </div>
                </div>
       
        </div>
    )
}

//         83<div class="grid-container">
//             <div class="col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6 m-0 px-0 position-relative box" >
//                 <img src={require("../Assets/img1.png")} alt="image1" height="160px" width="130px" class="imgBx" />

//                 <h4 class="h4"><b>Breakfast</b></h4>
//                 <p class="p">Start your day with exclusive breakfast options</p>
//             </div>
//         </div>
//     )
// }

export default Quicksearchitem;