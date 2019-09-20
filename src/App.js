import React, { Component } from "react";

import Board from "./components/Board/Board";

class App extends Component {
  componentDidMount() {
    fetch("/kanban-board")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  render() {
    return <Board />;
  }
}

export default App;
