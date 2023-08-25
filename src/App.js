import "./App.css";
import Cart from "./pages/e-commerce/Cart";

import { Routes, Route } from "react-router-dom";
import Data from "./pages/e-commerce/Data";

import RocketsIndex from "./pages/morePage/Rocketindex";
import Photo from "./pages/morePage/Photo";
import Movies from "./pages/morePage/Movies";
import addMovie from "./pages/morePage/AddMovie";
import AddMovie from "./pages/morePage/AddMovie";
import Search from "./pages/morePage/Search";
import ProductDetails from "../src/pages/e-commerce/ProductDetails";
import Wishlist from "./pages/e-commerce/Wishlist";

import Signup from "./pages/e-commerce/Signup";
import Signin from "./pages/e-commerce/Signin";
import OrderConfirm from "./pages/e-commerce/OrderConfirm";
import Protected from "./pages/e-commerce/Protected";
import { useState } from "react";

function App() {
  // const [isSignIn, setIsSignIn] = useState(false);

  // const SignIn = () => {
  //   isSignIn(true);
  // };
  // const Signout = () => {
  //   isSignIn(false);
  // };
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<Protected component={Data}/>} /> */}
        <Route path="/" element={<Data />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/detailsProduct:id" element={<ProductDetails />} /> */}
        {/* <Route path="/data" element={<Data />} /> */}

        <Route path="/rocket" element={<RocketsIndex />} />
        <Route path="/photos" element={<Photo />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/wishlistproduct" element={<Wishlist />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/orderconfirm" element={<OrderConfirm />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
