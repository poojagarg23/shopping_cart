import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../../store/CreateSlice";
import "./../../css/productDetails.css";

import { ShoppingCart } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
const Wishlist = (props) => {
  const wishlist = useSelector((state) => state.cart.wishlist) || [];
  // const cartitem = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(wishlist, "wishhhhhhh");
  // const getTotalQuantity = () => {
  //   let total = 0;
  //   wishlist?.cart?.map((item) => {
  //     total += item.quantity;
  //   });
  //   console.log(total, "totalp");

  //   return total;
  // };

  return (
    <div>
      <Navbar />
      <div>
        {wishlist.length != 0 &&
          wishlist?.map((item) => {
            return (
              <div className="flex-container">
                <div>
                  {" "}
                  <img
                    className="card-img-top zoom-on-hover"
                    src={item.image}
                  />
                </div>

                <div className="card card-body">
                  <p className="cartItem__title">{item.title}</p>
                  <p className="cartItem__price">
                    <small>$</small>
                    <strong>{item.price}</strong>
                  </p>
                  <p>{item.description}</p>
                  <h1>
                    -<span className="discount">{item.discount}% </span> $
                    <span>{item.price}</span>{" "}
                  </h1>{" "}
                  <div className="button-wishlist">
                    <button
                      className="removeWishlist"
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            title: item.title,
                            image: item.thumbnail,
                          })
                        )
                      }
                      className="button-addcart "
                    >
                      MOVE TO CART
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Wishlist;
