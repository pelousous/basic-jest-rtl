import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("testing summary form component", () => {
  test("check checkbox disabled", async () => {
    render(<SummaryForm />);

    const checkBox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkBox).not.toBeChecked();
  });

  test("check checkbox checked/unchecked after click", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const checkBox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });

    await user.click(checkBox);
    //expect(checkBox).toBeChecked();
    expect(button).toBeEnabled();

    await user.click(checkBox);
    //expect(checkBox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("on hover popover is in the page", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    expect(nullPopover).not.toBeInTheDocument();

    const terms = screen.getByText(/terms and conditions/i);

    await user.hover(terms);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );

    expect(popover).toBeInTheDocument();

    await user.unhover(terms);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
