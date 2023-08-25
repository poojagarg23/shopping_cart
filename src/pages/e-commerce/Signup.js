import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../css/login.css";
import { ShoppingCart } from "@mui/icons-material";

// import "./App.css";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeContext } from "@emotion/react";
import { Switch } from "@mui/material";
// import { signInWithPopup } from "firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";

export default function Signup() {
  const [data, setdata] = useState({ email: "", password: "" });
  const [error, seterror] = useState({});
  const [submiting, setsubmiting] = useState(false);
  const [theme, setTheme] = useState("light");
  const [value, setvalue] = useState();
  const locations = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
    seterror(validatevalue(data));
  };
  function handleSubmit(e) {
    e.preventDefault();
    seterror(validatevalue(data));
    setsubmiting(true);

    localStorage.setItem("users", JSON.stringify(data));
    // if(setsubmiting(true)){
    //   locations("/signin")
    // }

    setdata({ email: "", password: "" });
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
  useEffect(() => {
    document.body.className = theme + "-theme";
  }, [theme]);
  console.log(submiting);
  useEffect(() => {
    console.log(error);
    if (submiting && Object.keys(error).length === 0) {
      // console.log(data);
      locations("/signin");
    }
  }, [error]);
  const navigate = useNavigate();
  const cartitem = useSelector((state) => state.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cartitem?.cart?.map((item) => {
      total += item.quantity;
    });
    console.log(total, "totalp");

    return total;
  };
  const handleLogin = () => {
    navigate("/signin");
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const handleaToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  console.log(theme, "theme");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
      } else {
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleGoogle = () => {
    const res = signInWithPopup(auth, provider).then((datares) => {
      setvalue(datares.user.email);

      localStorage.setItem("email", JSON.stringify(datares.user.email));
      window.close();
      navigate("/");
    });
  };

  useEffect(() => {
    setvalue(JSON.parse(localStorage.getItem("email")));
    // console.log(datalocal, "localdataaaa");
  }, []);
  // console.log(value.data.email, "signinvalue");
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
            <div>
              <button onClick={() => handleLogin()}>Login</button>
            </div>
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
              <h1 className="mb-5">Sign-up page</h1>
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
              <Link className="link-signup" to="/signin">
                Already have account?
              </Link>
            </div>
            <div className="Google">
              {console.log(value, "valueconsole")}

              {/* {
                value  && value
              } */}
              <button
                className="goggle-authenticate"
                onClick={() => handleGoogle()}
              >
                Log in with Goggle
              </button>
            </div>
          </form>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
