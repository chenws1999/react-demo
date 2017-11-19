import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Btn from './Btn/Btn.js';
import RaisedBtn from './RaisedBtn/RaisedBtn.js';
import BtnTabs from './BtnTabs/BtnTabs.js';
import Button from './button.js';
function res () {
  return new Promise(res => {
    setTimeout(_ => {
      res();
    }, 1000);
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Btn label="test" status={1} type={0}/>
        <Btn label="test" status={0} type={0}/>
        <RaisedBtn onClick={res}/>
        <BtnTabs labels={[1, 3]}/>
        <Button />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
