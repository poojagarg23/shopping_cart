// import "./cart.css";
import "./../../css/cart.css";
import Total from "./Total";

import { useDispatch, useSelector } from "react-redux";

import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../store/CreateSlice";
import { Link, useNavigate } from "react-router-dom";
import Data from "./Data";
import { Navbar } from "./Navbar";
import { ThemeContext } from "@emotion/react";

function Cart({ theme }) {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // console.log(cart, "cart");
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <ThemeContext.Provider value={theme}>
        <div className="div-flex">
          <div className="cart">
            <div className="cart__left">
              <div>
                <h3>Shopping Cart</h3>
                <div>
                  {cart?.cart?.map((item) => {
                    return (
                      <div className="cartItem">
                        <img
                          className="cartItem__image"
                          src={item.image}
                          alt="item"
                        />

                        <div className="cartItem__info">
                          <p className="cartItem__title">{item.title}</p>
                          <p className="cartItem__price">
                            <small>$</small>
                            <strong>{item.price}</strong>
                          </p>
                          <div className="cartItem__incrDec">
                            <button
                              onClick={() =>
                                dispatch(decrementQuantity(item.id))
                              }
                            >
                              {" "}
                              -
                            </button>
                            <p>{item.quantity}</p>
                            <button
                              onClick={() =>
                                dispatch(incrementQuantity(item.id))
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="cartItem__removeButton"
                            onClick={() => {
                              console.log("dispatch", item.id);
                              dispatch(removeItem(item.id));
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="cart">
            <div className="cart__right">
              <Total />
            </div>
          </div>
          <button className="add-more" onClick={() => navigate("/")}>
            add more product{" "}
          </button>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default Cart;
