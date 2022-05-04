import axios from "axios";
import { useEffect, useState } from "react";
import { ScoopOptions } from "./ScoopOptions";

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

  return (
    <div>
      {options &&
        options.map((option) => {
          return (
            <ScoopOptions
              key={option.name}
              name={option.name}
              imagePath={option.imagePath}
            />
          );
        })}
    </div>
  );
};
