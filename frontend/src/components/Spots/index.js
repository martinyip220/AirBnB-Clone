import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./SpotPage.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spotsArr = Object.values(spotsObj)

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className="spot-block">
      {spotsArr.map((spot) => (
        <div className="spot-container" key={spot.id}>
          <SpotCard spot={spot} />
        </div>
      ))}
    </div>
  );
};

export default SpotsPage;
