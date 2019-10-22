import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadBoardData } from "./store/actions";
import { isTouch } from "./store/selectors";
import Board from "./components/Board/Board";

class App extends Component {
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

App.propTypes = {
  isTouch: PropTypes.bool.isRequired
};

export default connect(store => ({
  isTouch: isTouch(store)
}))(App);
