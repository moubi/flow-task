import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import debounce from "lodash/debounce";
import "swiped-events";

import {
  updateTask,
  deleteTaskAndUpdateColumn,
  completeTask
} from "../../store/actions";

import "./Task.scss";

const preventDefault = e => {
  e.preventDefault();
};

export class Task extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.isSwiped = false;
    this.state = {
      text: props.text,
      isOptionsMenuShown: false
    };

    this.handleTap = this.handleTap.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.showOptionsMenu = this.showOptionsMenu.bind(this);
    this.hideOptionsMenu = this.hideOptionsMenu.bind(this);
    this.updateTask = debounce(props.updateTask, 500);
  }

  componentDidMount() {
    this.el.addEventListener("swiped-left", this.showOptionsMenu);
    this.el.addEventListener("swiped-right", this.hideOptionsMenu);
    // Prevent scrolling the whole board when performing swipe on a task
    // That will completely disable scroll when performing touchmove
    // FIXME: Event listener could be attached directly to the element in the JSX,
    // but currently there is a react issue that needs to be fixed first
    // https://www.chromestatus.com/features/5093566007214080
    this.el.addEventListener("touchmove", preventDefault, false);
  }

  componentWillUnmount() {
    this.el.removeEventListener("swiped-left", this.showOptionsMenu);
    this.el.removeEventListener("swiped-right", this.hideOptionsMenu);
    this.el.removeEventListener("touchmove", preventDefault, false);
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

  showOptionsMenu() {
    this.isSwiped = true;
    this.setState({ isOptionsMenuShown: true });
  }

  hideOptionsMenu() {
    this.isSwiped = true;
    this.setState({ isOptionsMenuShown: false });
  }

  handleTap() {
    if (!this.props.isDragging && this.el) {
      // Do not focus when swipe has taken place
      // This will prevent virtual keyboard of beeing show
      // when options menu is toggled
      if (this.isSwiped) {
        this.isSwiped = false;
        return;
      }
      this.el.focus();
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
    this.hideOptionsMenu();
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
        <div
          className="Task-text"
          ref={el => {
            this.el = el;
          }}
          contentEditable
          onInput={this.handleTextChange}
          onTouchEnd={this.handleTap}
        >
          {text}
        </div>
        <div className="Task-options">
          <span className="Task-options-complete" onClick={this.handleComplete} />
          <span className="Task-options-delete" onClick={this.handleDelete} />
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
