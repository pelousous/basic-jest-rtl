import axios from "axios";
import { useEffect, useState } from "react";
import { ScoopOptions } from "./ScoopOptions";
import { ToppingOptions } from "./ToppingOptions";

// complete use component
// with bootstrap col
export const Options = ({ optionType }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`).then((response) => {
      setOptions(response.data);
    });
  }, [optionType]);

  //const ItemComponent = optionsType === "scoops" ? ScoopOptions : null;
  const ItemComponent =
    optionType === "scoops" ? ScoopOptions : ToppingOptions;
  return (
    <div>
      {options &&
        options.map((option) => {
          return (
            <ItemComponent
              key={option.name}
              name={option.name}
              imagePath={option.imagePath}
            />
          );
        })}
    </div>
  );
};
