import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [isDisabled, setIsDisabled] = useState(false);

  const changeColor = () => {
    const newButtonColor = buttonColor === 'red' ? "blue" : "red";
    setButtonColor(newButtonColor);
  };

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  }

  return (
    <div>
      <button style={{ backgroundColor: buttonColor }} onClick={() => changeColor()} disabled={isDisabled}>{`Change to ${buttonColor === 'red' ? 'blue' : 'red'}`}</button>
      <input type="checkbox" onchange={() => toggleDisabled()} />
    </div>
  );
}

export default App;
