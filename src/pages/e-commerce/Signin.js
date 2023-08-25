import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "@mui/icons-material";
import img from "../../img/personpic.png";

// import "./App.css";

import { useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import { ThemeContext } from "@emotion/react";

export default function Signin() {
  const [data, setdata] = useState({ email: "", password: "" });
  const [error, seterror] = useState({});
  const [submiting, setsubmiting] = useState(false);
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
    seterror(validatevalue(data));
  };
  function handleSubmit(e) {
    e.preventDefault();
    // setsubmiting(true);
    seterror(validatevalue(data));
    setsubmiting(true);
    const userdata = JSON.parse(localStorage.getItem("users"));
    userdata.email === data.email && userdata.password === data.password
      ? navigate("/", { state: userdata })
      : alert("you enter wrong data");
  }

  const validatevalue = (validate) => {
    let errors = {};

    if (validate.email === "") {
      errors.email = "email is required";
    }
    if (validate.password === "") {
      errors.password = "password is required";
    }
    return errors;
  };
  // console.log(users)
  // function handleSubmitbutton() {
  //   if (setsubmiting(true)) {
  //     locations("/signin");
  //   }
  // }
  console.log(submiting);
  useEffect(() => {
    document.body.className = theme + "-theme";
  }, [theme]);
  useEffect(() => {
    console.log(error);
    if (submiting && Object.keys(error).length === 0) {
      // console.log(data);
      navigate("/signin");
    }
  }, [error]);
  const cartitem = useSelector((state) => state.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cartitem?.cart?.map((item) => {
      total += item.quantity;
    });
    console.log(total, "totalp");

    return total;
  };
  // const handleSignup = () => {
  //   navigate("/signup");
  // };
  const userdata = localStorage.getItem("users");
  const isLogIn = !!userdata;
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const handleaToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  console.log(theme, "signinTheme");

  return (
    <>
      <nav class="navbar sticky-top navbar-light bg-light">
        <div class="container-fluid">
          <img
            src="https://img.freepik.com/free-vector/supermarket-logo-concept_23-2148467758.jpg?size=626&ext=jpg&ga=GA1.1.1734064433.1686913507&semt=ais"
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top"
            onClick={() => navigate("/")}
          ></img>
          <Switch excat onClick={() => handleaToggle()} {...label} />
          <div className="login-crediantials">
            {isLogIn ? (
              <div>
                {userdata.email}
                <img src={img} />
              </div>
            ) : (
              <div>
                <button onClick={() => navigate("/signup")}>signup</button>
              </div>
            )}

            <div className="shopping-cart" onClick={() => navigate("/cart")}>
              <ShoppingCart id="cartIcon" />
              {/* {console.log(getTotalQuantity || 0, "quantity")} */}
              <p>{getTotalQuantity() || 0}</p>
            </div>
          </div>
        </div>
      </nav>
      <ThemeContext.Provider value={theme}>
        <div className="main">
          <form className="form-main" onSubmit={handleSubmit}>
            <div className="mb-2">
              <h1 className="mb-5">Sign-In page</h1>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>
            {<p className="error">{error.email}</p>}
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
            </div>
            <p className="error">{error.password}</p>

            <div className="div-button">
              <button
                type="submit"
                className="btn btn-primary"
                // onClick={handleSubmitbutton}
              >
                Submit
              </button>

              {/* <Link>already have a account</Link> */}
              <Link className="link-signup" to="/signup">
                Not have account?
              </Link>
            </div>
          </form>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
