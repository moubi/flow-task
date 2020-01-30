import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getColumns, getTasks } from "./store/selectors";
import Board from "./components/Board/Board";

export class App extends Component {
  render() {
    const { columns, tasks } = this.props;

    if (Object.keys(columns).length === 0) {
      return "Loading...";
    }

    return (
      <Board columns={columns} tasks={tasks} />
    );
  }
}

App.propTypes = {
  columns: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired
};

export default connect(state => ({
  columns: getColumns(state),
  tasks: getTasks(state)
}))(App);
