import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
  // render create a virtual dom that creates
  // a global object "screen"
  render(<App />);

  // screen access the virtual DOM generated by render
  const colorButton = screen.getByRole('button', { name: /change to Midnight Blue/i });

  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

test('button turns blue when clicked', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: /change to Midnight Blue/i });

  fireEvent(
    colorButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });


  expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: /change to Midnight Blue/i });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

})

test('checkbox disabling functionalities', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: /change to Midnight Blue/i });
  const checkbox = screen.getByRole('checkbox', { name: /disable button/i });

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

test('button change color to grey when enabled/disabled', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: /change to Midnight Blue/i });
  const checkbox = screen.getByRole('checkbox', { name: /disable button/i });

  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });


  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: 'grey' });

  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
})

// create function to take string in camel case and separate with spaces
describe('space before camel-case capital letters', () => {
  test('test string with no capital letters', () => {
    expect(replaceCamelWithSpaces('red')).toBe('red');
  })

  test('test string with one capital letters', () => {
    expect(replaceCamelWithSpaces('redBlue')).toBe('red Blue');
  })

  test('test string with multiple capital letters', () => {
    expect(replaceCamelWithSpaces('redBlueGreen')).toBe('red Blue Green');
  })
})

