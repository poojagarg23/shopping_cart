import { useSelector } from "react-redux";
import "./../../css/total.css";
import Order from "./Order";
import { useState } from "react";
import { ThemeContext } from "@emotion/react";

function Total({ theme }) {
  const cart = useSelector((state) => state.cart);
  const [open, setopen] = useState(false);
  const getTotalQuantity = () => {
    let total = 0;
    let price = 0;
    cart.cart.map((item) => {
      total += item.quantity;
      price += item.price * total;
    });
    return { total, price };
  };
  console.log(getTotalQuantity().price, "price");
  // console.log(getTotalQuantity().price, "total quantity");
  const handleClick = () => {
    setopen(!open);
  };
  return (
    <ThemeContext.Provider value={theme}>
      <div className="total">
        <button onClick={() => handleClick()}>ORDER SUMMARY</button>
        {open && (
          <p className="total__p">
            total quantity:({getTotalQuantity().total}items)
            <p> total price: ${getTotalQuantity().price}</p>
          </p>
        )}
        <div>
          <Order />
        </div>
        <button>Payment Options</button>
      </div>
    </ThemeContext.Provider>
  );
}

export default Total;
