import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Task.scss";

export default class Task extends Component {
  render() {
    const { id, text, onDragStart, isDragging = false } = this.props;

    return (
      <div
        id={id}
        className={classNames("Task", {"Task--dragging": isDragging})}
        draggable
        onDragStart={() => onDragStart()}
        onClick={(e) => {
          e.stopPropagation();
          onDragStart();
        }}
      >
        {text}
      </div>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isDragging: PropTypes.bool,
  onDragStart: PropTypes.func.isRequired
}
