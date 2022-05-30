// CUSTOM RENDER https://testing-library.com/docs/react-testing-library/setup
import { render, screen } from "../../../test-utils/test-utils";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { Options } from "../Options";

// when you are waiting for something to appear asynchronously on the page, you must use "await" and findBy
test("display image for each scoop options from the server", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // find images
  // use "await" and "find" when dealing with asynch els
  const images = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(images).toHaveLength(2);

  //confirm alt text
  const alts = images.map((img) => img.alt);
  // to equal for objects and arrays
  // to be for strings and numbers
  expect(alts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each of topping options from the server", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  // confirm alts
  const alts = images.map((image) => image.alt);

  expect(alts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
