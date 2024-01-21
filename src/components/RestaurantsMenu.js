import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants";

const RestaurantsMenu = () => {
  const [restInfo, setRestInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API_URL + resId);
    const json = await data.json();
    setRestInfo(json.data);
  };

  if (restInfo === null) return <Shimmer />;

  const { name, cuisines, avgRating, costForTwo } =
    restInfo?.cards[0]?.card?.card?.info;
  const { itemCards } =
    restInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>Cuisines: {cuisines.join(" ")}</h3>
      <h3>Rating: {avgRating}</h3>
      <h3>Rs.{costForTwo / 100} for Two</h3>

      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} - {item.card.info.price || "no price"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsMenu;
