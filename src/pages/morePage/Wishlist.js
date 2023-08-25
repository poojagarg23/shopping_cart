import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../store/CreateSlice";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(wishlist, "wishhhhhhh");
  return (
    <div>
      <div>
        {wishlist?.wishlist?.map((item) => {
          return (
            <div className="flex-container">
              <div>
                {" "}
                <img className="card-img-top zoom-on-hover" src={item.image} />
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
                <div>
                  <button
                    className="removeWishlist"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
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
