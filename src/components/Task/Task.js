import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Task.scss";

export default class Task extends Component {
  render() {
    const { id, text, onDragStart } = this.props;

    return (
      <div 
        id={id} 
        className="Task" 
        draggable 
        onDragStart={() => onDragStart()}
      >
        {text}
      </div>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired
}
