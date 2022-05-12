import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Options } from "../Options";

test("updates scoop subtotal when scoop changes", async () => {
  render(<Options optionType="scoops" />);

  // if exact: true by default check only if match
  // entirely and not partially
  const scoopSubTotal = screen.getByText("Scoops total: $", { exact: false });

  expect(scoopSubTotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // we need to clear the input before type in
  // just to be sure to enter the correct text
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  // check the text partially
  expect(scoopSubTotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and chck subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubTotal).toHaveTextContent("4.00");

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
