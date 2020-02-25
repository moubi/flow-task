import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import debounce from "lodash/debounce";

import {
  updateTask,
  deleteTaskAndUpdateColumn,
  completeTask
} from "../../store/actions";

import Swipeable from "../Swipeable/Swipeable";

import "./Task.scss";

export class Task extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.isSwiped = false;
    this.state = {
      // TODO: may need to cover the case when props.text
      // changes and need to update the state
      text: props.text,
      isOptionsMenuShown: false
    };

    this.handleTap = this.handleTap.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.updateTask = debounce(props.updateTask, 500);
  }

  shouldComponentUpdate({ isDragging }, { isOptionsMenuShown }) {
    if (
      isOptionsMenuShown !== this.state.isOptionsMenuShown ||
      isDragging !== this.props.isDragging
    ) {
      return true;
    }
    return false;
  }

  handleSwipeLeft() {
    this.isSwiped = true;
    this.setState({ isOptionsMenuShown: true });
  }

  handleSwipeRight() {
    this.isSwiped = true;
    this.setState({ isOptionsMenuShown: false });
  }

  handleTap() {
    if (!this.props.isDragging && this.el) {
      this.el.focus();
      // Move cursor to the end
      document.execCommand("selectAll", false, null);
      document.getSelection().collapseToEnd();
    }
  }

  handleTextChange(e) {
    const text = e.target.innerText;

    this.setState({ text }, () => {
      this.updateTask(this.props.id, { text });
    });
  }

  handleDelete() {
    this.props.deleteTaskAndUpdateColumn(this.props.id);
  }

  handleComplete() {
    this.props.completeTask(this.props.id);
    this.handleSwipeRight();
  }

  render() {
    const { id, isDragging } = this.props;
    const { text, isOptionsMenuShown } = this.state;

    return (
      <div
        id={id}
        className={classNames("Task", {
          "Task--dragging": isDragging,
          "Task--isOptionsMenuShown": isOptionsMenuShown
        })}
      >
        <Swipeable
          maxDistance={90}
          onSwipeLeft={this.handleSwipeLeft}
          onSwipeRight={this.handleSwipeRight}
        >
          {innerRef => (
            <div
              className="Task-text"
              ref={el => {
                this.el = el;
                innerRef(el);
              }}
              contentEditable
              onInput={this.handleTextChange}
              onTouchEnd={this.handleTap}
            >
              {text}
            </div>
          )}
        </Swipeable>
        <div className="Task-options">
          <span className="Task-options-complete" onClick={this.handleComplete}>
            complete
          </span>
          <span className="Task-options-delete" onClick={this.handleDelete}>
            delete
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
  completeTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTaskAndUpdateColumn: PropTypes.func.isRequired
};

export default connect(null, {
  updateTask,
  completeTask,
  deleteTaskAndUpdateColumn
})(Task);
