import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Column.scss";

export default class Column extends Component {
  render() {
    const { id, name, children, onDrop, onDragOver } = this.props;

    return (
      <div
        id={id}
        name={name}
        className="Column"
        onDrop={onDrop}
        onClick={onDrop}
        onDragOver={onDragOver}
      >
        <h2>{name}</h2>
        {children}
      </div>
    );
  }
}

Column.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired
}
