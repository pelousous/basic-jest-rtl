import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  // render create a virtual dom that creates
  // a global object "screen"
  render(<App />);

  // screen access the virtual DOM generated by render
  const colorButton = screen.getByRole('button', { name: /change to blue/i });

  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
});

test('button turns blue when clicked', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: /change to blue/i });

  fireEvent(
    colorButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: /change to blue/i });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

})

test('checkbox disabling functionalities', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: /change to blue/i });
  const checkbox = screen.getByRole('checkbox'); 

  expect(colorButton).toBeEnabled();

  // click and check if button is disabled
  fireEvent(checkbox,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(colorButton).toBeDisabled();

  // click again and test if the button is enabled
  fireEvent(checkbox,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(colorButton).toBeEnabled();

})
