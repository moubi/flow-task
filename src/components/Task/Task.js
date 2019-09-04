import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Task.scss";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.buttonPressTimer = null;
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
  }

  handleButtonPress() {
    this.buttonPressTimer = setTimeout(() => console.log('long press activated'), 1500);
  }

  handleButtonRelease() {
    clearTimeout(this.buttonPressTimer);
  }

  render() {
    const { id, text, onDragStart, isDragging = false } = this.props;

    return (
      <div
        id={id}
        className={classNames("Task", { "Task--dragging": isDragging })}
        draggable
        // Enable inline edit
        onDoubleClick={(e) => {
          e.stopPropagation();
          console.log("onDoubleClick");
        }}
        onDragStart={() => onDragStart()}
        onClick={(e) => {
          console.log("onClick");
          e.stopPropagation();
          onDragStart();
        }}
        onTouchStart={this.handleButtonPress}
        onTouchEnd={this.handleButtonRelease}
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonRelease}
        onMouseLeave={this.handleButtonRelease}>
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
