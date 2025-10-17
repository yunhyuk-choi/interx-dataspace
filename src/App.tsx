import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import TitleBar from './titlebar/TitleBar';

function App() {
  return (
    <div className="App">
      <TitleBar/>
      <Dashboard/>
    </div>
  );
}

export default App;
