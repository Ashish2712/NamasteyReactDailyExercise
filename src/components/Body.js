import React, { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import UseOnlineStatus from "../utils/useOnlineStatus";
import { MENU_API } from "../utils/constants";

const Body = () => {
  // Local state variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const OnlineStatus = UseOnlineStatus();

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  // whenever state updates, react triggers a reconciliation cycle(re-renders the component)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(MENU_API);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setListOfRestaurants(
        data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      ); // Assuming the restaurant data is under the 'data' property
      setFilteredRestaurants(
        data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      );
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle the error appropriately, such as showing an error message to the user.
    }
  };

  const handleFilter = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.2
    );
    setFilteredRestaurants(filteredList);
  };

  if (OnlineStatus === false)
    return (
      <h1>
        {" "}
        OOPS! Looks like you are offline please check you internet connection.
      </h1>
    );
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-0 bg-green-100 m-4"
            onClick={() => {
              // filter the restaurant cards and update the UI
              // searchText
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurants(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={handleFilter}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {/* {restaurant.data.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : ( )*/}
              <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
