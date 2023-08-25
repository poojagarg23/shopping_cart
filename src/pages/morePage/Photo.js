import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchPhotos,
  getPhotosError,
  getPhotosStatus,
  selectAllPhotos,
} from "../../store/PhotoSlice";

const Photo = () => {
  const dispatch = useDispatch();
  const photos = useSelector(selectAllPhotos);
  console.log(photos, "photos");
  const photoStatus = useSelector(getPhotosStatus);
  const error = useSelector(getPhotosError);

  useEffect(() => {
    if (photoStatus === "idle") {
      dispatch(fetchPhotos());
    }
  }, [photoStatus, dispatch]);

  let contentToDisplay = "";
  if (photoStatus === "loading") {
    contentToDisplay = <h2>Loading...</h2>;
  } else if (photoStatus === "succeeded") {
    contentToDisplay = photos.map((data) => (
      <div key={data.id}>
        <h2>{data.title}</h2>

        <img src={data.url} />
        <hr />
      </div>
    ));
  } else if (photoStatus === "failed") {
    contentToDisplay = <p>{error}</p>;
  }

  return (
    <div>
      <h1>photos page</h1>
      <div>{contentToDisplay}</div>

      {/* {photos?.map((item) => (
        <div key={item.id}>
          <h1>{item.rocket_name}</h1>
        </div>
      ))} */}
    </div>
  );
};

export default Photo;
