import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useDispatch } from "react-redux";
import { addToCart, addproduct, filter } from "../../store/CreateSlice";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import Filter from "./Filter";
import { Navbar } from "./Navbar";

export default function Data(props) {
  const { state } = useLocation();
  console.log(state, "statedata");
  const [user, setuser] = useState();
  const [filteredUser, setFilteredUser] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [validuser, setvaliduser] = useState();
  console.log(filteredUser, "filter");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "https://dummyjson.com/products";

  console.log(url, "url");
  async function data() {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result.products, "quantity");
      setuser(result?.products);
      // cart(result.products);
      // setuser(filteredCart);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    data();
  }, []);
  useEffect(() => {
    setFilteredUser(user);
  }, [user]);

  //   const getTotalQuantity = () => {
  //     let total = 0;
  //     cart.map((item) => {
  //       total += item.quantity;
  //     });
  //     return total;
  //   };

  const handleFilter = (filterValue) => {
    setSelectedFilter(filterValue);
    if (filterValue === "All") {
      setFilteredUser(user);
    } else {
      const filteredProducts = user.filter(
        (item) => item.category === filterValue
      );
      setFilteredUser(filteredProducts);
    }
  };

  console.log(user, "uuuuuuuuuuu");
  const isdataLogin = localStorage.getItem("users");
  const islogIN = !!isdataLogin;
  return (
    <div>
      <Navbar />
      <Filter handleFilter={handleFilter} />

      <div className="home">
        <div>
          <div className="home__row">
            {filteredUser?.map((Item) => {
              return (
                <div className="item" key={Item.id}>
                  {/* <button onClick={() => handleFilter(Item)}>All</button>{" "} */}
                  <div className="item__info">
                    <p className="item__title">{Item.title}</p>
                    <p className="item__price">
                      <small>$</small>
                      <strong>{Item.price}</strong>
                    </p>
                  </div>
                  <Link to={`/products/${Item.id}`} key={Item.id}>
                    <img className="image" src={Item.thumbnail} alt="item" />
                  </Link>

                  <button
                    onClick={() => {
                      // navigate("/signin");
                      if (islogIN) {
                        dispatch(
                          addToCart({
                            id: Item.id,
                            title: Item.title,
                            quantity: Item.quantity,
                            image: Item.thumbnail,
                            price: Item.price,
                          })
                        );
                      } else {
                        navigate("/signin");
                      }
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
