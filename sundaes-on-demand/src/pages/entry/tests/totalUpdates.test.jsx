// CUSTOM RENDER https://testing-library.com/docs/react-testing-library/setup
import { render, screen } from "../../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Options } from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

test("updates scoop subtotal when scoop changes", async () => {
  // Pass a React Component as the wrapper option to have it rendered around the inner element.
  // refs: https://testing-library.com/docs/react-testing-library/setup#custom-render
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

test("update toppings subtotal when toppings changes", async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  await userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  await userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("Grand total should start at 0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("Grand total should update when adding scoops first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const vanillaOption = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await userEvent.clear(vanillaOption);
    await userEvent.type(vanillaOption, "1");

    expect(grandTotal).toHaveTextContent("2.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("Grand total should update when adding toppings first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const chocolateOption = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    await userEvent.clear(chocolateOption);
    await userEvent.type(chocolateOption, "1");

    expect(grandTotal).toHaveTextContent("2.00");

    const hotFudgeCheckbox = screen.getByRole("checkbox", {
      name: "Hot fudge",
    });

    await userEvent.click(hotFudgeCheckbox);

    expect(grandTotal).toHaveTextContent("Grand total: $3.50");
  });

  test("Grand total should update when removing an element", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const vanillaOption = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const chocolateOption = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await userEvent.clear(vanillaOption);
    await userEvent.type(vanillaOption, "2");

    expect(grandTotal).toHaveTextContent("4.0");

    await userEvent.clear(chocolateOption);
    await userEvent.type(chocolateOption, "1");

    expect(grandTotal).toHaveTextContent("6.0");

    await userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("7.5"); 

    await userEvent.clear(vanillaOption);
    await userEvent.type(vanillaOption, "0");

    expect(grandTotal).toHaveTextContent("3.5");
  });
});
