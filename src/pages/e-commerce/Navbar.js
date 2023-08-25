import { ShoppingCart } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./../../css/home.css";
import Signin from "./Signin";
import img from "../../img/personpic.png";
import { FiLogOut } from "react-icons/fi";
import Theme from "./Theme";
import Switch from "@mui/material/Switch";
export const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme + "-theme";
  }, [theme]);
  const cartaddvalue = useSelector((state) => state.cart);
  console.log(cartaddvalue, "cartaddvalue");
  const getTotalQuantity = () => {
    let total = 0;
    cartaddvalue?.cart?.map((item) => {
      total += item?.quantity;
    });
    console.log(total, "total");

    return total;
  };
  const userdata = JSON.parse(localStorage.getItem("users"));
  console.log(userdata, "userdaatttttt");
  const handleLogin = () => {
    navigate("/signin");
    // setDatLogin(isLogIn(true))
  };
  const handleLogout = () => {
    localStorage.removeItem("users");
    navigate("/signin");
  };
  const isLogIn = !!userdata;
  console.log(isLogIn, "isloginin");

  const handleaToggle = () => {
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
  };
  console.log(theme, "theme");
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div>
      <nav class="navbar sticky-top navbar-light bg-light">
        <div class="container-fluid">
          <button className="button-logo" onClick={() => navigate("/")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXam8TEoFSuMN22fIb5FF-qE9v-sZJBfLyUQ&usqp=CAU"
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            ></img>
          </button>
          <div className="login-crediantials">
            {isLogIn ? (
              <div className="email-avtar">
                {userdata.email}
                <img src={img} />
              </div>
            ) : (
              <div>
                <button onClick={() => handleLogin()}>login</button>
              </div>
            )}
            <button onClick={() => handleLogout()}>
              <FiLogOut />
            </button>
            {/* <Theme /> */}
            {/* <button onClick={() => handleaToggle()}>theme</button> */}

            <Switch excat onClick={() => handleaToggle()} {...label} />

            <div className="shopping-cart" onClick={() => navigate("/cart")}>
              <ShoppingCart id="cartIcon" />
              {/* {console.log(getTotalQuantity || 0, "quantity")} */}
              <p>{getTotalQuantity() || 0}</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
