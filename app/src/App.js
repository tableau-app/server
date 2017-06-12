import React, { Component } from 'react';
import logo from './dalai-lama-egg-head.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" style={{ borderRadius: '50%'}}/>
          <h2>Welcome to Tableau</h2>
        </div>
      </div>
    );
  }
}

export default App;
