import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { selectProducts } from "../../store/CreateSlice";

const Filter = ({ handleFilter }) => {
  const dispatch = useDispatch();

  // const product = useSelector(selectProducts);
  //   console.log(product, "ppppppppp");
  return (
    <div>
      <div className="filter">
        <div>
          {" "}
          <button
            className="filter-button"
            onClick={() => handleFilter("home-decoration")}
          >
            <img src="https://rukminim2.flixcart.com/flap/64/64/image/0ff199d1bd27eb98.png?q=100" />
            Home decoration
          </button>
        </div>
        <div>
          <button
            className="filter-button"
            onClick={() => handleFilter("smartphones")}
          >
            <img src="https://rukminim1.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100" />
            smartphones
          </button>
        </div>
        <div>
          {" "}
          <button
            className="filter-button"
            onClick={() => handleFilter("groceries")}
          >
            <img src="https://rukminim1.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100" />
            Grocery
          </button>
        </div>
        <div>
          <button
            className="filter-button"
            onClick={() => handleFilter("skincare")}
          >
            <img src="https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100" />
            Skincare
          </button>
        </div>
        <div>
          <button
            className="filter-button"
            onClick={() => handleFilter("laptops")}
          >
            <img src="https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100" />
            Electronics
          </button>
        </div>
        <div>
          <button
            className="filter-button"
            onClick={() => handleFilter("fragrances")}
          >
            <img
              className="fragrances"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJKGxe4fx6Vz0dYYqlJbCEayki9Zaz9VeJvA&usqp=CAU"
            />
            fragrances
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
