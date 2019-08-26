import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Column.scss";

export default class Column extends Component {
  render() {
    const { id, children, onDrop, onDragOver } = this.props;

    return (
      <div 
        id={id} 
        className="Column" 
        onDrop={onDrop} 
        onDragOver={onDragOver}
      >
        {children}
      </div>
    );
  }
}

Column.propTypes = {
  id: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired
}
