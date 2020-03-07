import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getColumns, getTasks, isFetching } from "./store/selectors";
import Board from "./components/Board/Board";
import Loader from "./components/Loader/Loader";

export class App extends Component {
  render() {
    const { columns, tasks, tasksFetching } = this.props;

    if (Object.keys(columns).length === 0 || tasksFetching) {
      return <Loader />;
    }

    return <Board columns={columns} tasks={tasks} />;
  }
}

App.propTypes = {
  columns: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  tasksFetching: PropTypes.bool.isRequired
};

export default connect(state => ({
  columns: getColumns(state),
  tasks: getTasks(state),
  tasksFetching: isFetching(state)
}))(App);
