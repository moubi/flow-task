import React, { Component } from "react";
import { loadBoardData } from "./store/actions";
import Board from "./components/Board/Board";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    loadBoardData().then(data => {
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return "Loading...";
    }
    return <Board data={data} isTouch={this.props.isTouch} />;
  }
}
