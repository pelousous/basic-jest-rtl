import Button from "react-bootstrap/esm/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Options } from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals["grandTotal"]}</h2>
      <Button
        variant="primary"
        type="button"
        onClick={() => setOrderPhase("review")}
      >
        Confirm order
      </Button>
    </div>
  );
}
