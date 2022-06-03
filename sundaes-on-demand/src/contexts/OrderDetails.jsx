import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { formatter } from "../utilities";

export const pricePerItem = {
  scoops: 2,
  toppings: 1.5,
};

// no default value -- like this
// we can return undefined if context is not present
const OrderDetails = createContext();

// create custom hook that checks if we are not inside provider
// and return context
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be called inside OrderDetailsProvider"
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

// return provider with values
export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatter.format(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatter.format(scoopsSubtotal),
      toppings: formatter.format(toppingsSubtotal),
      grandTotal: formatter.format(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCounts = { ...optionCounts };

      // update option count for this item with new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionsCounts(newOptionsCounts);
    }

    // getter: object containing option counts for scoops and toppings
    // and the subotals and totals

    // setter: update OptionsCounts

    // return getter and setter
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
