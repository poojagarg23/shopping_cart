import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllRockets,
  getRocketsStatus,
  getRocketsError,
  fetchRockets,
} from "../../store/PartSlice";

const RocketsIndex = () => {
  const dispatch = useDispatch();
  const rockets = useSelector(selectAllRockets);
  console.log(rockets, "rockets");
  const rocketStatus = useSelector(getRocketsStatus);
  const error = useSelector(getRocketsError);

  useEffect(() => {
    if (rocketStatus === "idle") {
      dispatch(fetchRockets());
    }
  }, [rocketStatus, dispatch]);

  let contentToDisplay = "";
  if (rocketStatus === "loading") {
    contentToDisplay = <h2>Loading...</h2>;
  } else if (rocketStatus === "succeeded") {
    contentToDisplay = rockets.map((data) => (
      <div key={data.id}>
        <h2>{data.rocket_name}</h2>
        <p>{data.description}</p>
        <img className="w-100" src={data.flickr_images} />
        <hr />
      </div>
    ));
  } else if (rocketStatus === "failed") {
    contentToDisplay = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Rockets page</h1>
      <div>{contentToDisplay}</div>

      {/* {rockets?.map((item) => (
        <div key={item.id}>
          <h1>{item.rocket_name}</h1>
        </div>
      ))} */}
    </div>
  );
};

export default RocketsIndex;
