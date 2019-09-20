import React, { Component } from "react";

import Board from "./components/Board/Board";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch("/kanban-board")
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return "Loading...";
    }
    return <Board data={data} />;
  }
}

export default App;
