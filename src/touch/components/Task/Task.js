import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "swiped-events";

import "./Task.scss";

const preventDefault = e => {
  e.preventDefault();
};

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.state = {
      text: props.text,
      isOptionsMenuShown: false,
      isRenameEnabled: false
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleEnableRenaming = this.handleEnableRenaming.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showOptionsMenu = this.showOptionsMenu.bind(this);
    this.hideOptionsMenu = this.hideOptionsMenu.bind(this);
  }

  componentDidMount() {
    this.el.addEventListener("swiped-left", this.showOptionsMenu);
    this.el.addEventListener("swiped-right", this.hideOptionsMenu);
    // Prevent scrolling the whole board when performing swipe on a task
    // That will completely disable scroll when performing touchmove on a task
    // FIXME: This could be attached directly to the element in the JSX, but
    // currently there is a react issue that needs to be fixed first
    // https://www.chromestatus.com/features/5093566007214080
    this.el.addEventListener("touchmove", preventDefault, false);
  }

  componentWillUnmount() {
    this.el.removeEventListener("swiped-left", this.showOptionsMenu);
    this.el.removeEventListener("swiped-right", this.hideOptionsMenu);
    this.el.removeEventListener("touchmove", preventDefault, false);
  }

  showOptionsMenu() {
    this.setState({ isOptionsMenuShown: true });
  }

  hideOptionsMenu() {
    this.setState({ isOptionsMenuShown: false });
  }

  shouldComponentUpdate({ text, isDragging }, { isOptionsMenuShown }) {
    if (
      text !== this.state.text ||
      isOptionsMenuShown !== this.state.isOptionsMenuShown ||
      isDragging !== this.props.isDragging
    ) {
      return true;
    }
    return false;
  }

  handleEnableRenaming(e) {
    // Prevent click of bubbling up to the Column and triggering drag
    e.stopPropagation();
    this.setState(
      {
        isOptionsMenuShown: false,
        isRenameEnabled: true
      },
      () => {
        // TODO: call focus() on options menu animation end, so that
        // we have proper horizontal scroll
        this.el && this.el.focus();
      }
    );
  }

  handleBlur(e) {
    // Remove contentEditable on blur,
    // so that it's not possible to edit when click on the element.
    // Click triggers drag, so we want to avoid it
    // TODO: when proper dnd is implemented, this may not be needed
    this.setState({ isRenameEnabled: false });
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

  render() {
    const { id, onDragStart, isDragging } = this.props;
    const { text, isOptionsMenuShown, isRenameEnabled } = this.state;

    return (
      <div
        id={id}
        className={classNames("Task", {
          "Task--dragging": isDragging,
          "Task--isOptionsMenuShown": isOptionsMenuShown
        })}
        draggable
        onDragStart={onDragStart}
      >
        <div
          className="Task-text"
          ref={el => {
            this.el = el;
          }}
          contentEditable={isRenameEnabled}
          onInput={this.handleTextChange}
          onBlur={this.handleBlur}
        >
          {text}
        </div>
        <div className="Task-options">
          <span className="Task-options-delete" onClick={this.handleDelete}>
            Delete
          </span>
          <span
            className="Task-options-rename"
            onClick={this.handleEnableRenaming}
          >
            Rename
          </span>
        </div>
      </div>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  isDragging: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
