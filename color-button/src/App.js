import './App.css';
import { useState } from 'react';

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/([A-Z])/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const [isDisabled, setIsDisabled] = useState(false);

  const changeColor = () => {
    const newButtonColor = buttonColor === 'MediumVioletRed' ? "MidnightBlue" : "MediumVioletRed";
    setButtonColor(newButtonColor);
  };

  const toggleDisabled = (checked) => {
    setIsDisabled(checked);
    setButtonColor(checked ? 'grey' : 'MediumVioletRed');
  }

  return (
    <div>
      <button style={{ backgroundColor: buttonColor }} onClick={() => changeColor()} disabled={isDisabled}>{`Change to ${buttonColor === 'MediumVioletRed' ? replaceCamelWithSpaces('MidnightBlue') : replaceCamelWithSpaces('MediumVioletRed')}`} </button>
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
