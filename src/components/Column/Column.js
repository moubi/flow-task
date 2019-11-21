import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Column.scss";

export default class Column extends Component {
  render() {
    const {
      id,
      name,
      count,
      children,
      onAdd,
      innerRef,
      droppableProps
    } = this.props;

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
          {onAdd && <i className="plus" onClick={onAdd} />}
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
  onAdd: PropTypes.func,
  droppableProps: PropTypes.object.isRequired,
  innerRef: PropTypes.func.isRequired
};
