import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addtoFav,
  fetchmovie,
  getmovieError,
  getmovieStatus,
  removeItem,
  selectAllmovie,
  selectFavorites,
} from "../../store/MovieSlice";
import Slider from "react-slick";
import AddPicture from "./AddPicture";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { v4 as uuid } from "uuid";

const Movies = () => {
  var settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          //   dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  const movie = useSelector(selectAllmovie);
  const [search, setsearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [items, setitems] = useState([]);
  const movieFav = useSelector(selectFavorites);
  const [favMovie, setFavMovie] = useState([]);
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setimage] = useState([]);

  console.log(movieFav, "addfav");
  const movietatus = useSelector(getmovieStatus);
  const error = useSelector(getmovieError);
  useEffect(() => {
    if (movieFav.length != 0) {
      setFavMovie(movieFav);
    } else {
      setFavMovie(movieFav);
    }
  }, [movieFav]);
  useEffect(() => {
    if (movietatus === "idle") {
      dispatch(fetchmovie());
    }
  }, [movietatus, dispatch]);

  let contentToDisplay = "";

  const handleSearch = (e) => {
    console.log("eeee ", e.target.value);
    const searchText = e.target.value;
    dispatch(fetchmovie(searchText));
  };
  const handleInputChange = (e) => {
    setData({ ...data, movieName: e.target.value });
  };
  const handleChange = (e) => {
    const selectedFile = e.target.files[0].name;
    // setData({ ...data, movieImage: selectedFile });
    const filesArray = [];
    for (let i = 0; i < selectedFile.length; i++) {
      const file = selectedFile[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        filesArray.push({ name: file.name, dataURL: reader.result });
        if (filesArray.length === selectedFile.length) {
          setimage([...image, ...filesArray]);
        }
      };

      reader.readAsDataURL(file);
    }

    console.log(selectedFile, "sdata");
  };
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    // const filesArray = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        let imgObj = {
          name: file.name,
          dataURL: reader.result,
          id: uuid(),
        };
        console.log(imgObj, "obj");
        setimage((prev) => [...prev, imgObj]);
      };

      reader.readAsDataURL(file);
    }
  };
  console.log(title, "title:::");
  const handleCaptionChange = (e) => {
    setTitle(e.target.value);
  };

  // function handlechangeInput(e){
  //   setimage(e.target.vale)
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const existingData = JSON.parse(localStorage.getItem("myData") || "[]");
  //   existingData.push({
  //     movieImage: data.movieImage,
  //     movieName: data.movieName,
  //   });
  //   console.log(existingData, "eeeexxxx");

  //   localStorage.setItem("myData", JSON.stringify(existingData));

  //   // setData({
  //   //   ...data,
  //   //   movieImage: dataset.movieImage,
  //   //   movieName: dataset.movieName,
  //   // });
  // }
  // console.log("dataaa ", data);
  // useEffect(() => {
  //   const dataget = JSON.parse(localStorage.getItem("myData"));
  //   console.log(dataget, "get");
  //   setitems(dataget);

  //   console.log(items, "iteams====>");
  // }, []);
  //fav
  console.log(movie, "movieaddfav");
  const [favorites, setFavorites] = useState([]);
  const handleAddToFavorites = (data) => {
    dispatch(addtoFav(data));
    setFavorites([...favorites, data]);
    console.log(favorites, "fav=============");
  };
  //delete
  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handledeleteimage = (id) => {
    console.log(id, "imagedelete");
    const update = image.filter((state) => state.id != id);
    setimage(update);
    // console.log(update, "update");
  };
  const handleSubmit = (e) => {
    e.prventDefault();
    setimage("");
  };

  return (
    <>
      <div className="main-div">
        <h1>movie page</h1>
        <input
          className="search"
          type="text"
          search={search}
          placeholder="search here"
          onChange={(e) => handleSearch(e)}
        ></input>{" "}
        <AiOutlineSearch className="search-icon" />
        {movietatus === "succeeded" ? (
          <>
            <div>
              <Slider {...settings}>
                {movie?.map((data) => (
                  <div key={data.imdbID} className="hover-main-code">
                    <h6>{data.Title} </h6>
                    <img className="img-poster" src={data.Poster} />
                    <button
                      onClick={() =>
                        handleAddToFavorites({
                          id: data.imdbID,
                          title: data.Title,
                          image: data.Poster,
                        })
                      }
                      className="buttton-fav"
                    >
                      <BsFillHeartFill />
                    </button>
                    {/* <hr /> */}
                  </div>
                ))}
              </Slider>
            </div>
          </>
        ) : (
          <p>{error}</p>
        )}
      </div>
      <hr />
      {/* <img src={localStorage.getItem("myData")} /> */}
      <div>
        {console.log(items, " arrrrr")}
        {/* {items?.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.movieName}</h1>
              <img src={item.movieImage} />
            </div>
          );
        })} */}
        <div className="image">
          {/* <input type="file" multiple onChange={handleFileChange} /> */}
          {/* {image?.map(() => {
            return (
              <div>
                <img src={image.dataURL} />
              </div>
            );
          })} */}
          {console.log(image, "iiiiiiiiiiiiii")}
          <div>
            {title}
            {image?.map((item, index) => (
              <div key={index}>
                <img
                  src={item.dataURL}
                  alt={item.name}
                  style={{ maxWidth: "200px" }}
                />

                <p>{item.name}</p>
                {console.log(item.id, "item-id")}
                <button
                  className="button-delete"
                  onClick={() => handledeleteimage(item.id)}
                >
                  {" "}
                  <AiFillDelete />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div>
          <h1 className="add-fav">Add favorite</h1>
          <div>
            {console.log(favMovie, "favMovie")}
            <Slider {...settings}>
              {favMovie?.map((data) => {
                return (
                  <>
                    <div key={data.id}>
                      <div>
                        <h6>{data.title} </h6>
                        <img className="img-poster" src={data.image} />
                        <button
                          className="button-delete"
                          onClick={() => handleDelete(data.id)}
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </Slider>
          </div>

          {/* {getTotalQuantity || 0} */}
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Add movie
        </Button>
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>My Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Input</Form.Label>
              <FormControl
                type="text"
                onChange={handleCaptionChange}
                placeholder="Enter caption..."
              />
              <FormControl
                type="file"
                multiple
                onChange={handleFileChange}
              ></FormControl>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onSubmit={() => handleSubmit()}>
              {" "}
              submit
            </Button>
            {/* You can add more buttons in the footer as needed */}
          </Modal.Footer>
        </Modal>

        {/* <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Input </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter something..."
                onChange={(e) => handleInputChange(e)}
              />
              <Form.Control
                type="file"
                onChange={(e) => handleChange(e)}
              ></Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              ADD
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </>
  );
};

export default Movies;
