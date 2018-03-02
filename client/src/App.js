import React, { Component } from 'react';

import MakePost from './components/MakePost';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Pena Puhuu</h1>
      <MakePost />
      </div>
    );
  }
}

export default App;
