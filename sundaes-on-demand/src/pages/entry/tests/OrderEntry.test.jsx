// CUSTOM RENDER https://testing-library.com/docs/react-testing-library/setup
import { render, screen, waitFor } from "../../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("handling error on scoop options and toppings options", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />, {
    wrapper: OrderDetailsProvider,
  });

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");

    expect(alerts).toHaveLength(2);
  });
});

test("check if button cnfirm order is disabled when no scoops added", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />, {
    wrapper: OrderDetailsProvider,
  });

  const scoopsTotal = await screen.findByText("Scoops total: $", {
    exact: false,
  });

  const confirmOrder = await screen.findByRole("button", {
    name: /Confirm order/i,
  });

  expect(scoopsTotal).toHaveTextContent("0.00");
  expect(confirmOrder).toBeDisabled();

  const vanillaOption = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await userEvent.clear(vanillaOption);
  await userEvent.type(vanillaOption, "1");

  expect(confirmOrder).toBeEnabled();

  await userEvent.clear(vanillaOption);
  await userEvent.type(vanillaOption, "0");

  expect(confirmOrder).toBeDisabled();
});
