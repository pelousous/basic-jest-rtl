import { render, screen } from "@testing-library/react";
import { Options } from "../Options";

// when you are waiting for something to appear asynchronously on the page, you must use "await" and findBy
test("display image for each scoop options from the server", async () => {
  render(<Options optionType="scoops" />);

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
