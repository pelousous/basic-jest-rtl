import logo from './logo.svg';
import './App.css';
import SummaryForm from './pages/summary/SummaryForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SummaryForm />
    </div>
  );
}

export default App;
