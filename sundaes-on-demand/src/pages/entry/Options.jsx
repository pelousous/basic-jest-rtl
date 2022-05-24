import axios from "axios";
import { useEffect, useState } from "react";
import { useOrderDetails, pricePerItem } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";
import { ScoopOptions } from "./ScoopOptions";
import { ToppingOptions } from "./ToppingOptions";

// complete use component
// with bootstrap col
export const Options = ({ optionType }) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  console.log('orderDetails: ', orderDetails);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  //const ItemComponent = optionsType === "scoops" ? ScoopOptions : null;
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  return (
    <div>
      <h2>{optionType}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {optionType} total: {orderDetails.totals[optionType]}
      </p>
      {options &&
        options.map((option) => {
          return (
            <ItemComponent
              updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, optionType)
              }
              key={option.name}
              name={option.name}
              imagePath={option.imagePath}
            />
          );
        })}
    </div>
  );
};
