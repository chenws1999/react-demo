import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Btn from './Btn/Btn.js';
import RaisedBtn from './RaisedBtn/RaisedBtn.js';
import BtnTabs from './BtnTabs/BtnTabs.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Btn label="test" status={1} type={0}/>
        <RaisedBtn onClick={_ => console.log('test')}/>
        <BtnTabs labels={[1, 3]}/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
