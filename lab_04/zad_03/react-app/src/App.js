import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          inna
        </p>
        <a
          className="App-link"
          href="https://hub.docker.com/repository/docker/mwiecaszek/tech_chum_mw"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link do repo z zad.2
        </a>
      </header>
    </div>
  );
}

export default App;
