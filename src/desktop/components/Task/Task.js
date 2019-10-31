import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Task.scss";

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.state = {
      text: props.text,
      showOptions: false
    };
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  shouldComponentUpdate({ text }, { showOptions }) {
    if (text !== this.state.text || showOptions !== this.state.showOptions) {
      return true;
    }
    return false;
  }

  handleFocus(e) {
    // Prevent click to bubble up to the Column and trigger drag
    e.stopPropagation();
    this.el.setAttribute("contentEditable", true);
    this.el && this.el.focus();
    // Close the options menu when renaming
    this.handleMouseLeave();
  }

  handleBlur(e) {
    // Remove contentEditable on blur, so that it's not possible
    // to edit when click on the element.
    // Click triggers drag, so we want to avoid it
    // TODO: when proper dnd is implemented, this may not be needed
    this.el.setAttribute("contentEditable", false);
  }

  handleDragStart(e) {
    // Stop event so that it doesn't go to the Column
    // We may need to allow it to propagate in order to
    // change possition within column
    e.stopPropagation();
    this.props.onDragStart();
  }

  handleTextChange(e) {
    const text = e.target.innerText;
    this.setState({ text }, () => {
      this.props.onChange(text);
    });
  }

  handleDelete(e) {
    e.stopPropagation();
    this.props.onDelete();
  }

  handleMouseEnter() {
    this.setState({ showOptions: true });
  }

  handleMouseLeave() {
    this.setState({ showOptions: false });
  }

  render() {
    const { id, onDragStart, isDragging = false } = this.props;
    const { text, showOptions } = this.state;

    return (
      <div
        id={id}
        className={classNames("Task", {
          "Task--dragging": isDragging,
          "Task--showOptions": showOptions
        })}
        draggable
        onDragStart={onDragStart}
        onClick={this.handleDragStart}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          className="Task-text"
          ref={el => {
            this.el = el;
          }}
          onInput={this.handleTextChange}
          onBlur={this.handleBlur}
        >
          {text}
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
  text: PropTypes.string,
  isDragging: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired
};
