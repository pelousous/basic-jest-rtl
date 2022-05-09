import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";
import { rest } from "msw";

test("handling error on scoop options and toppings options", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});
