import React, { useState } from "react";
import axios from "axios";

const MovieUploader = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [movies, setMovies] = useState([]);

  // API URL from MockAPI
  const apiUrl = "https://64ba2a6b5e0670a501d5b9db.mockapi.io/users";

  // Function to fetch movies data from the API
  const fetchMovies = async () => {
    try {
      const response = await axios.get(apiUrl);
      setMovies(response.data);
      console.log(response, "data response");
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  // Function to create a new movie entry in the API
  const createMovie = async () => {
    try {
      const newMovieData = new FormData();
      newMovieData.append("title", title);
      newMovieData.append("image", image);

      const response = await axios.post(apiUrl, newMovieData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Created movie:", response.data);

      // Clear the form fields after successful creation
      setTitle("");
      setImage(null);

      // Fetch the updated movie list from the API
      fetchMovies();
    } catch (error) {
      console.error("Error creating movie in API:", error);
    }
  };

  // Function to handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie Title"
        />
        <input type="file" onChange={handleImageChange} />
        <button onClick={createMovie}>Add Movie</button>
      </div>

      <div>
        {console.log(movies, "movies")}
        {/* Render the list of movies */}
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img
              src={movie.image}
              alt={movie.title}
              style={{ maxWidth: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieUploader;
