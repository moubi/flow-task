import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTaskInColumn } from "../../store/actions";
import "./Column.scss";

// TODO: Use selector instead
const FIRST_COLUMN_ID = "d1ea1845-86e2-4c46-976c-8b09ba4786e5";

export class Column extends Component {
  render() {
    const {
      id,
      name,
      count,
      children,
      createTaskInColumn,
      innerRef,
      droppableProps
    } = this.props;

    const isFirstColumn = id === FIRST_COLUMN_ID;

    return (
      <div
        id={id}
        name={name}
        className="Column"
        ref={innerRef}
        {...droppableProps}
      >
        <header>
          <h2>
            {name} ({count})
          </h2>
          {isFirstColumn && <i className="plus" onClick={createTaskInColumn} />}
        </header>
        {children}
      </div>
    );
  }
}

Column.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  shouldHaveAddIcon: PropTypes.bool,
  droppableProps: PropTypes.object.isRequired,
  innerRef: PropTypes.func.isRequired,
  createTaskInColumn: PropTypes.func.isRequired
};

export default connect(null, {
  createTaskInColumn
})(Column);
