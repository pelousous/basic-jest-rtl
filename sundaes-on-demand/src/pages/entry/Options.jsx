import axios from "axios";
import { useEffect, useState } from "react";
import { useOrderDetails, pricePerItem } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";
import { ScoopOptions } from "./ScoopOptions";
import { ToppingOptions } from "./ToppingOptions";
import Row from "react-bootstrap/Row";
import { formatter } from "../../utilities";

// complete use component
// with bootstrap col
export const Options = ({ optionType }) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(
        `https://3030-pelousous-basicjestrtl-qb8chneooxi.ws-eu46.gitpod.io/${optionType}`
      )
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
      <p>{formatter.format(pricePerItem[optionType])} each</p>
      <p>
        {optionType} total: {orderDetails.totals[optionType]}
      </p>
      <Row>
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
      </Row>
    </div>
  );
};
