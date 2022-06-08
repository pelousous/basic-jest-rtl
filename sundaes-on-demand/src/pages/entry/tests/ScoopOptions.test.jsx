import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScoopOptions } from "../ScoopOptions";

test("validate scoop count value", async () => {
  render(<ScoopOptions name="" imagePath="" updateItemCount={jest.fn()} />);

  const vanillaOption = screen.getByRole("spinbutton");

  userEvent.clear(vanillaOption);
  await userEvent.type(vanillaOption, "-1");

  expect(vanillaOption).toHaveClass("is-invalid");
});
