import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post(
        "https://3030-pelousous-basicjestrtl-qb8chneooxi.ws-eu46.gitpod.io/order"
      )
      .then(({ data }) => {
        setOrderNumber(data.orderNumber);
      });
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("in progress");
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
