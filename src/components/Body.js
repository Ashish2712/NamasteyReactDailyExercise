import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import UseOnlineStatus from "../utils/useOnlineStatus";


const Body = () => {
  // Local state variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const OnlineStatus = UseOnlineStatus();

  // whenever state updates, react triggers a reconciliation cycle(re-renders the component)

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
      console.log(data.data);

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
    console.log(listOfRestaurants.length);
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.2
    );
    console.log(filteredList.length);
    setFilteredRestaurants(filteredList);
  };

  if(OnlineStatus === false) return <h1> OOPS!  Looks like you are offline please check you internet connection.</h1>
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // filter the restaurant cards and update the UI
              // searchText
              console.log(searchText);
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurants(filteredRestaurant);
            }}
          >
            {" "}
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={handleFilter}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
