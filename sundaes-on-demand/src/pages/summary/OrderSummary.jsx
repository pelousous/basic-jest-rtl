import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const toppingArr = Array.from(orderDetails.toppings);
  const scoopsArr = Array.from(orderDetails.scoops);

  return (
    <div>
      <h1>Order Summary</h1>
      {toppingArr.map((el) => {
        return (
          <div>
            {el[0]}: {el[1]}
          </div>
        );
      })}
      {scoopsArr.map((el) => {
        return (
          <div>
            {el[0]}: {el[1]}
          </div>
        );
      })}
      <SummaryForm />
    </div>
  );
}
