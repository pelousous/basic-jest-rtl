import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order Phase for happy path', async () => {
  // render app
  render(<App />);

  const grandTotal = screen.getByText('Grand total: $', { exact: false });
  // add ice cream scoops and toppings
  const vanillaOption = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  const cherriesOption = await screen.findByRole('checkbox', { name: 'Cherries' });

  await userEvent.clear(vanillaOption);
  await userEvent.type(vanillaOption, '1');

  await userEvent.click(cherriesOption);

  expect(grandTotal).toHaveTextContent('3.50');

  // find and click the order button
  const orderButton = screen.getByText('Confirm order');
  userEvent.click(orderButton);

  // check summary infos based on order
  const scoopsTotal = await screen.findByText("Scoops: $", { exact: false });

  expect(scoopsTotal).toHaveTextContent("$2.00");

  const toppingsTotal = await screen.findByText("Toppings: $", { exact: false });

  expect(toppingsTotal).toHaveTextContent("$1.50");

  // accept terms and conditions and click button to confirm order
  const checkboxTerms = await screen.findByRole('checkbox');

  await userEvent.click(checkboxTerms);

  const submitOrder = screen.getByRole('button', { name: 'Confirm order' });

  await userEvent.click(submitOrder);

  // check if loading is there
  const loading = screen.getByText('Loading');
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  const thankYou = await screen.findByRole('heading', {name: 'Thank You!'});

  expect(thankYou).toBeInTheDocument();

  // check LOADER disappear when confirmation page is loaded
  // await waitForElementToBeRemoved(() => screen.queryByText('Loading'));

  await waitFor(() => {
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  // confirm order number on confirmation page
  const orderNmbrPar = await screen.findByText('Your order number is ', { exact: false });

  await expect(orderNmbrPar).toHaveTextContent('7392822562');

  // click "new order" button on confirmation page
  const newOrderBtn = screen.getByRole('button', { name: 'Create new order' });

  await userEvent.click(newOrderBtn);


  // check that scoops and toppings subtotals have been resetted
  const grandTotal2 = await screen.findByText('Grand total: $', { exact: false });

  expect(grandTotal2).toHaveTextContent('0.00');

  // do we need to await anything to avoid test errors?
  // check if the buttons are presents and the call is succesfull
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('order Phase for happy path with NO TOPPINGS', async () => {
  render(<App />);

  const grandTotal = screen.getByText('Grand total: $', { exact: false });

  const vanillaOption = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  await userEvent.clear(vanillaOption);
  await userEvent.type(vanillaOption, '1');

  expect(grandTotal).toHaveTextContent('2.00');

  const confirmOrder = await screen.findByText('Confirm order', { exact: false });

  await userEvent.click(confirmOrder);

  const toppingstotal = screen.queryByText('Toppings: ', { exact: false });

  expect(toppingstotal).not.toBeInTheDocument();

});