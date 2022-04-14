import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/([A-Z])/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [isDisabled, setIsDisabled] = useState(false);

  const changeColor = () => {
    const newButtonColor = buttonColor === 'red' ? "blue" : "red";
    setButtonColor(newButtonColor);
  };

  const toggleDisabled = (checked) => {
    setIsDisabled(checked);
    setButtonColor(checked ? 'grey' : 'red');
  }

  return (
    <div>
      <button style={{ backgroundColor: buttonColor }} onClick={() => changeColor()} disabled={isDisabled}>{`Change to ${buttonColor === 'red' ? 'blue' : 'red'}`} </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={isDisabled}
        aria-checked={isDisabled}
        onChange={(e) => toggleDisabled(e.target.checked ? true : false)} />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
