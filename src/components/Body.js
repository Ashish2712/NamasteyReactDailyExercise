import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setListOfRestaurants(data.data); // Assuming the restaurant data is under the 'data' property
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle the error appropriately, such as showing an error message to the user.
    }
  };

  const handleFilter = () => {
    const filteredList = resList.filter((res) => res.info.avgRating > 4.2);
    setListOfRestaurants(filteredList);
  };

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={handleFilter}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
