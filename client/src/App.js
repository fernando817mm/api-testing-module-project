import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Fernando's first deployed API</p>
        <a
          className="App-link"
          href="https://github.com/fernando817mm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit my GitHub
        </a>
      </header>
    </div>
  );
}

export default App;
