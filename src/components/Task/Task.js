import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Task.scss";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.buttonPressTimer = null;
    this.getRef = this.getRef.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleNewInput = this.handleNewInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // We need a way to avoid contentEditable warnings from react
    // One way to do so is to add the attribute after mounting
    if (this.el) {
      this.el.setAttribute("contentEditable", true);
    }
  }

  handleFocus(e) {
    e.stopPropagation();
    this.el && this.el.focus();
  }

  handleDragStart(e) {
    // Stop event so that it doesn't go to the Column
    // We may need to allow it to propagate in order to
    // change possition within column
    e.stopPropagation();
    this.props.onDragStart();
  }

  handleNewInput(e) {
    this.props.onChange(e.target.innerHTML);
  }

  handleDelete(e) {
    e.stopPropagation();
    this.props.onDelete();
  }

  getRef(el) {
    this.el = el;
  }

  render() {
    const { id, children, onDragStart, isDragging = false } = this.props;

    return (
      <div
        id={id}
        className={classNames("Task", { "Task--dragging": isDragging })}
        draggable
        onDragStart={onDragStart}
        onClick={this.handleDragStart}
      >
        <div
          className="Task-text"
          ref={this.getRef}
          onInput={this.handleNewInput}
        >
          {children}
        </div>
        <div className="Task-options">
          <span className="Task-options-delete" onClick={this.handleDelete} />
          <span className="Task-options-rename" onClick={this.handleFocus} />
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  isDragging: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired
};
