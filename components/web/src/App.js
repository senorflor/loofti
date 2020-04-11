import React from 'react';
import './App.css';

const App = () => 
  <div className="App">
    <header className="App-header">
      <h1>
        Your new web app, stamped out with <span role="img" aria-label="love">💖</span> and care by&nbsp; 
        <a className="bp-link" href="https://platter.dev" target="_blank" rel="noopener noreferrer">Platter</a>
      </h1>
      <h2><span role="img" aria-label="GOGOGO">🏃</span> now get going!</h2>
      <p>
        (Edit <code>components/web/src/App.js</code> and save to reload. You are viewing the {process.env.REACT_APP_WHEREAMI} deployment.)
      </p>
    </header>
  </div>;

export default App;
