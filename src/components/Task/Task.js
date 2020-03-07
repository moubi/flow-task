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

import Swipeable from "swipeable-react";

import "./Task.scss";

const TRANSITION_DURATION = 600;

export class Task extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.state = {
      // TODO: may need to cover the case when props.text
      // changes and need to update the state
      text: props.text,
      isOptionsMenuShown: false,
      forDeletion: false,
      forCompletion: false
    };

    this.handleTap = this.handleTap.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.updateTask = debounce(props.updateTask, 500);
    this.completeTask = debounce(props.completeTask, TRANSITION_DURATION);
    this.deleteTaskAndUpdateColumn = debounce(props.deleteTaskAndUpdateColumn, TRANSITION_DURATION);
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
    this.setState({ isOptionsMenuShown: true });
  }

  handleSwipeRight() {
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
    this.deleteTaskAndUpdateColumn(this.props.id);
    this.setState({ forDeletion: true });
    this.handleSwipeRight();
  }

  handleComplete() {
    this.completeTask(this.props.id);
    this.setState({ forCompletion: true });
    this.handleSwipeRight();
  }

  render() {
    const { id, isDragging } = this.props;
    const { text, isOptionsMenuShown, forDeletion, forCompletion } = this.state;

    return (
      <div
        id={id}
        className={classNames("Task", {
          "Task--dragging": isDragging,
          "Task--delete": forDeletion,
          "Task--complete": forCompletion,
          "Task--isOptionsMenuShown": isOptionsMenuShown
        })}
        style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
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
              suppressContentEditableWarning
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
