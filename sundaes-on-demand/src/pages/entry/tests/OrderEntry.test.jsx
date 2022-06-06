// CUSTOM RENDER https://testing-library.com/docs/react-testing-library/setup
import { render, screen, waitFor } from "../../../test-utils/test-utils";
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
