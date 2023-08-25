import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Data from "./Data";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addproduct,
  addtopeoducts,
  wishlist,
} from "../../store/CreateSlice";
// import "../e-commerce/ProductDetails.css";
import "./../../css/productDetails.css";
import { ShoppingCart } from "@mui/icons-material";
import { AiOutlineHeart } from "react-icons/ai";

import Slider from "react-slick";
import ImageMagnify from "react-image-magnify";
import { Navbar } from "./Navbar";

const ProductDetails = (props) => {
  // const { state } = useLocation();
  // console.log(state, "productSTATEEEEEEEEEE");
  const param = useParams();
  const [data, setdata] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage, "selectedImage");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //slick setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  const url = "https://dummyjson.com/products";
  console.log(url, "url");
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setdata(responseData.products);
        console.log(responseData.products, "responsedata");
      });
  }, []);
  const product = data.find((product) => String(product.id) == param.id);
  const cartitem = useSelector((state) => state.cart);
  const state = localStorage.getItem("users");
  console.log(cartitem?.cart, "quantity");

  console.log(product, "productid");

  // const handleWishlist = () => {
  //   navigate("/product/wishlist");
  //   dispatch(
  //     wishlist({
  //       id: product.id,
  //       title: product.title,
  //       price: product.price,
  //       image: product.thumbnail,
  //       quantity: product.quantity,
  //       description: product.description,
  //       discount: product.discountPercentage,
  //     })
  //   );
  // };
  const handleSaveCart = ({ e, product }) => {
    e.preventDefault();
    console.log(product, "productsssssssssssss");
    dispatch(
      addtopeoducts({
        id: product.id,
        title: product.title,
        image: product.thumbnail,
        quantity: product.quantity,
        price: product.price,
        discount: product.discountPercentage,
        description: product.description,
      })
    );
    // setTimeout(() => {
    navigate("/wishlistproduct");
    // }, 2000);

    // console.log(wishlist, "wishlist");
  };
  return (
    <div>
      {/* {product} */}
      {console.log(product?.brand, "idproduct", product)}
      <Navbar />
      {/* <Slider {...settings}> */}

      {/* </Slider> */}
      <div>
        <div className="flex-container" key={product?.id}>
          <div>
            <ImageMagnify
              className="rim-magnifier"
              {...{
                smallImage: {
                  alt: product?.title,
                  isFluidWidth: true,

                  src: selectedImage || product?.thumbnail,
                },
                largeImage: {
                  src: selectedImage || product?.thumbnail,
                  width: 1000,
                  height: 800,
                },
                shouldHideHintAfterFirstActivation: false,
              }}
            />
          </div>

          <div className="card card-body">
            <h1>{product?.title}</h1>
            <h3>brand:{product?.brand}</h3>
            <h5>{product?.rating}-rating</h5>
            <p>{product?.description}</p>
            <h3>
              -<span className="discount">{product?.discountPercentage}% </span>{" "}
              $<span>{product?.price}</span>{" "}
            </h3>{" "}
            <h4>product left:{product?.stock}</h4>
            <div></div>
            <div className="button-wishlist">
              <button
                className="button-addcart"
                onClick={() => {
                  if (state) {
                    dispatch(
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.thumbnail,
                        quantity: product.quantity,
                      })
                    );
                  } else {
                    navigate("/signin");
                  }
                }}
              >
                Add to Cart
              </button>

              <button
                className="button-wishlist"
                onClick={(e) => {
                  handleSaveCart({ e, product });
                }}
              >
                SAVE FOR LATER
              </button>
            </div>
          </div>
        </div>
        <div className="slider">
          {product?.images?.map((data) => (
            <div className="img-sidebar-div" key={data?.id}>
              <img
                className="img-sidebar"
                src={data}
                onClick={() => setSelectedImage(data)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
