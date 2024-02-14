import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-responsive-carousel/lib/styles/carousel.min.css";
//Above line imported from node_modules
import { Carousel } from "react-responsive-carousel";
import 'react-tabs/style/react-tabs.css';
// import "D:/Ramya--edureka/Zomato/zomato-clone/src/Styles/Details.css";
import queryString from "query-string";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Checkout from "./Checkout";

const Details = () => {

    const customStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'burlywood',
            height: '650px',
            width: '500px',
            textAlign: 'center',
            // borderRadius: '10px 10px 10px 10px'
        }
    };

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // }

    const [list, setList] = useState([])
    const [menu, setMenu] = useState([]);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [count, setCount] = useState([]);
    const [paymentModal, setPaymentModal] = useState(false)

    useEffect(() => {
        const parseQuery = queryString.parse(window.location.search)
        const parseId = parseQuery.restaurant;
        console.log(parseId)


    axios.get(`https://outstanding-fish-pleat.cyclic.app/getRestaurantById/${parseId}`)
           .then((res) =>{
             setList(res.data)
             const name=res.data.name  
             console.log(list) 
        
 axios.get(`https://outstanding-fish-pleat.cyclic.app/getMenuItemByname/${name}`)
             .then((res)=>
             setMenu(Array(res.data)),
              console.log(menu)
             )
           }
           )
     }, [])

    const handleModal = () => {
        setMenuIsOpen(true);
        console.log(menu);
    }

    const handleDecrement = (selectItem, index) => {

        if (selectItem && quantity > 0 && count[index] > 0) {

            setCount(pre => {
                const newCount = { ...pre, [index]: pre[index] - 1 };
                setQuantity(pre => pre - selectItem.Price);
                return newCount
            })
        }
    };

    const handleIncrement = (selectItem, index) => {

        if (selectItem) {
            setCount((pre) => {
                const newCount = { ...pre, [index]: (pre[index] || 0) + 1 };
                setQuantity(pre => parseFloat(pre + selectItem.Price))
                return newCount
            })
        }
    };


    // const galleryOpen = () => {
    //     setGalleryIsOpen(true);
    //     axios.get(`http://localhost:1900/menu/${lists.name}`)
    //         .then((res) => {

    //             setMenu(res.data);
    //         })
    // }

    const paymentIsOpen = () => {
        setMenuIsOpen(false);
        setPaymentModal(true);
    }

    const cashOnDelivery = () => {
        setMenuIsOpen(false);
        alert("Order Accepted...")
    }

    return (

        <div>
            <div className="container tab">
                <Carousel>
                    <div>
                        <img src={require("../Assets/img1.png")} alt="Breakfast" width="100%" />
                        <p className="slide">Slide 1</p>
                    </div>
                    <div>
                        <img src={require("../Assets/img2.png")} alt="Lunch" width="100%" />
                        <p className="slide">Slide 2</p>
                    </div>
                    <div>
                        <img src={require("../Assets/img3.png")} alt="Dinner" width="100%" />
                        <p className="slide">Slide 3</p>
                    </div>
                </Carousel>

                <div>
                    {/* <img src={require("../Assets/bg.png")} alt="no image" className="Dimage " /> */}
                    <h2>{list.name}</h2>
                    <button className="btn-danger text-dark online-btn" onClick={handleModal}>Place Online Orders</button>
                </div>

                <Tabs>
                    <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Contact</Tab>
                    </TabList>

                    <TabPanel>
                        <b>{list.name}</b>
                        <p>Unbelievable Combo Traditional Food Hut</p>
                    </TabPanel>

                    <TabPanel>
                        <b>Phone Number</b>
                        <h5>{list.contact_number}</h5>
                        <h3>{list.name}</h3>
                        <address>{`${list.locality}-${list.city}`}</address>
                    </TabPanel>

                </Tabs>

            </div>

            <Modal isOpen={menuIsOpen} style={customStyle}>
                <h1>hi</h1>
             
                {menu.length > 0 ?
                    menu.map((e) => {
                        return <div>
                            <h1 style={{ color: 'blue' }} className="fw-bold">{e.name.toUpperCase()}</h1>
                            <hr className="foods" />
                            <div style={{ background: 'white', width: '650px', height: '400px' }}>

                                <div>
                                    {e.item.map((a, index) => (
                                        <span className="d-flex justify-content-between p-2" key={index}>
                                            <p style={{ color: 'gray' }} className='px-4'>{a.menu}</p>
                                      
                                            <div className="d-flex justify-content-evenly px-4" style={{ width: '180px', border: 'none' }}>
                                                <button className="btn btn-outline-warning" onClick={() => handleDecrement(a, index)}>-</button>
                                                <button className="fw-bold fs-6 text-center btn btn-outline-success">{count[index] || 0}</button>
                                                <button className="btn btn-outline-warning" onClick={() => handleIncrement(a, index)}>+</button>
                                            </div>

                                            <h4 className="py-3" style={{ color: 'darkgray' }}> &#8377; {a.Price} </h4>
                                        </span>
                                    )
                                    )}

                                </div>

                            </div>

                            <hr />
                            <h1 style={{ color: 'black', marginLeft: '40%' }} className='px-3 py-1'>Subtotal: &#8377; {quantity}</h1>
                            <div className="d-flex justify-content-evenly">
                                <button className='btn btn-outline-success fs-5 fw-bold' onClick={paymentIsOpen}>Pay Online</button>
                                <button className='btn btn-outline-success fs-5 fw-bold' onClick={cashOnDelivery}>COD</button>
                            </div>
                        </div>
                    }) 
                   : <div>no value</div>
                } 
            </Modal>
            <Modal isOpen={paymentModal} style={customStyle}>
                <Checkout amount={quantity} />
            </Modal>
        </div >
    )
}

export default Details;
