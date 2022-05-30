import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

// CUSTOM RENDER https://testing-library.com/docs/react-testing-library/setup
const customRender = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
