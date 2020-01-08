import React from 'react';
import './App.css';
import Lift from './Lift/Lift';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Lift />
      </header>
    </div>
  );
}

export default App;
