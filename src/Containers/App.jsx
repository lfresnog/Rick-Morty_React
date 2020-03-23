import React, { Component } from 'react';
import './App.css';
import Characters from '../Components/Characters'

class App extends Component {
  state={
    data:null
  }
  render() {
    return (
      <div className="App">
        <div className="Title">
          <h1>Rick And Morty</h1>
        </div>
        <div className="Body">
          <Characters data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;
