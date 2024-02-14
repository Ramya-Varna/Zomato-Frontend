import React, { useState } from "react";

export default function Checkout(props) {

    const [total, setTotal] = useState(props.amount)

    const handlePayment = (e) => {
        e.preventDefault();
        if (total === 0 || "") {
            alert("Please select the Items")
        } else {
            var options = {
                key: "rzp_test_de13yWbjPdnORB",
                key_secret: "qxlnzCyn3u5pZKomCKKe3Vbe",
                amount: total * 100,
                currency: "INR",
                name: "Food Delivery Demo",
                description: "Test transaction",
                handler: function (response) {
                    alert(response.razorpay_payment_id)
                },
                prefill: {
                    name: 'ramya',
                    email: 'ramyavarna1@gmail.com',
                    contact: '8508003295'
                },
                notes: {
                    address: "Razorpay corporate"
                },
                theme: {
                    color: "#FFA07A"
                }
            };

            var pay = new window.Razorpay(options);
            pay.open()
        }
    }

    return (
        <div>
            <form>
                <h1 className='fw-bold'>payment</h1>
                <hr />
                <h1 style={{ color: "#6495ED" }} value={total} onChange={e => setTotal(e.target.value)}>Total:&#8377;{props.amount}</h1>
                <button className="btn btn-outline-danger" onClick={handlePayment}>Pay</button>
            </form>
        </div>
    )
}