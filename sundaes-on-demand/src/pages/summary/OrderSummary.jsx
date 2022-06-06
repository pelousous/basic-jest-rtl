import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const toppingArr = Array.from(orderDetails.toppings);
  const scoopsArr = Array.from(orderDetails.scoops);

  const toppingsList = (
    <>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>
        {toppingArr.map((el) => {
          return (
            <li key={el[0]}>
              {el[0]}: {el[1]}
            </li>
          );
        })}
      </ul>
    </>
  );

  const scoopsList = scoopsArr.map((el) => {
    return (
      <li key={el[0]}>
        {el[0]}: {el[1]}
      </li>
    );
  });

  console.log(orderDetails);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopsList}</ul>
      {toppingArr.length ? toppingsList : ''}
      <SummaryForm setOrderPhase={ setOrderPhase } />
    </div>
  );
}
