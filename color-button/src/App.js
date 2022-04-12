import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [buttonColor, setButtonColor] = useState("red");

  const changeColor = () => {
    const newButtonColor = buttonColor === 'red' ? "blue" : "red";
    setButtonColor(newButtonColor);
  };

  return (
    <div>
      <button style={{ backgroundColor: buttonColor }} onClick={() => changeColor()}>{`Change to ${buttonColor === 'red' ? 'blue' : 'red'}`}</button>
      <input type="checkbox" />
    </div>
  );
}

export default App;
