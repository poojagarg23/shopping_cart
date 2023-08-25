import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Total from "./Total";
import { useSelector } from "react-redux";
import confirm from ".././../img/download.jpg";

const OrderConfirm = (props) => {
  const { state } = useLocation();
  console.log(state, "uselocation");
  const [items, setiteams] = useState();
  const data = JSON.parse(localStorage.getItem("addressdata")) || {};

  useEffect(() => {
    if (data) {
      setiteams(data);
    }
    console.log(items, "iteamsAddress");
  }, []);
  const cart = useSelector((state) => state.cart);

  const getTotalQuantity = () => {
    let total = 0;
    let price = 0;
    cart.cart.map((item) => {
      total += item.quantity;
      price += item.price * total;
    });
    return { total, price };
  };
  return (
    <>
      {/* <div className="div-para">
        <p>this is more div</p>
      </div> */}
      <div className="order-details-page">
        <hr></hr>
        <div className="data-order-details">
          <div className="confirm">
            <img src={confirm} />
          </div>
          <h1>Thanks You For Your Order!!!</h1>
          <h1>Order confirm</h1>
          <div className="total__p">
            <div className="flex-total">
              <span> Total QTY:</span>{" "}
              <span>({getTotalQuantity().total}QTY)</span>
            </div>
            <hr></hr>
            <div className="flex-total">
              {" "}
              <span>Total :</span> <span>${getTotalQuantity().price}</span>
            </div>
          </div>
          <div className="data-order">
            <h6>Name: {`${data?.firstname}  ${data.lastname}`}</h6>
            <hr></hr>
            <h6>City: {data.city}</h6>
            <hr></hr>
            <h6>Address: {data.address}</h6>
            <hr></hr>
            <h6>State: {data.state}</h6>
            <hr></hr>
            <h6>Zip: {data.zip}</h6>
            <hr></hr>
            <p>
              Want Any Help?<a href="#">Please Contact Us</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;
