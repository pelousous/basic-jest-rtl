import { render, screen } from "../../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Options } from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("updates scoop subtotal when scoop changes", async () => {
  // Pass a React Component as the wrapper option to have it rendered around the inner element.
  // refs: https://testing-library.com/docs/react-testing-library/setup#custom-render
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // if exact: true by default check only if match
  // entirely and not partially
  const scoopSubTotal = screen.getByText("Scoops total: $", { exact: false });

  expect(scoopSubTotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // we need to clear the input before type in
  // just to be sure to enter the correct text
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  // check the text partially
  expect(scoopSubTotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");
  expect(scoopSubTotal).toHaveTextContent("6.00");

  // toppings

  // const toppingsSubtotal = screen.getByText("Toppings total: $", {
  //   exact: false,
  // });

  // expect(toppingsSubtotal).toHaveTextContent("0.00");
  // const gummiInput = screen.findByRole("spintButton", { name: "Gummi bears" });

  // gummiInput.clear();
  // userEvent.type(gummiInput, "1");

  // expect(toppingsSubtotal).toHaveTextContent("1.50");
});
