import { screen, render } from "../../test-utils/test-utils";
import { server } from "../../mocks/server";
import { rest } from "msw";
import OrderConfirmation from "./OrderConfirmation";

test("show alert for error when submitting order", async () => {
  server.resetHandlers(
    rest.post(
      "https://3030-pelousous-basicjestrtl-qb8chneooxi.ws-eu47.gitpod.io/order",
      (req, res, ctx) => res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alertMsg = await screen.findByRole('alert');

  expect(alertMsg).toHaveTextContent('An unexpected error occurred. Please try again later');


});
