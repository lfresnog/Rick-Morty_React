import React, { Component } from "react";
import "./App.css";

import Data from "./assets/data";
import Character from "./components/Character";
import "./components/styles.css";

class App extends Component {
  state = {
    data: { ...Data },
    alive: null
  };

  render() {
    return (
      <div className="App">
        <div className="content">
          <div className="title"> RICK AND MORTY</div>
          <div className="main content">
            {this.state.data.results.map(item => {
              return <Character key={item.id} characterInfo={item} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
