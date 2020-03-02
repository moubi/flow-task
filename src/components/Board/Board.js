import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { moveTask } from "../../store/actions";

import Column from "../Column/Column";
import Task from "../Task/Task";
import Swipeable from "../Swipeable/Swipeable";

import "./Board.scss";

export let VIEWPORT_WIDTH = 0;

const stopImmediatePropagation = e => {
  e.stopImmediatePropagation();
};

const getColumnIndexAtPosition = scrollX =>
  Math.floor(Math.abs(scrollX) / VIEWPORT_WIDTH);

const getColumnTransitionStyle = columnIndex => ({
  left: columnIndex * -VIEWPORT_WIDTH + "px",
  transition: "left 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)"
});

export class Board extends Component {
  constructor(props) {
    super(props);

    this.el = null;
    this.state = {
      swipeStyle: { left: 0 }
    };

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.handleOnBeforeDragCapture = this.handleOnBeforeDragCapture.bind(this);
    // This is needed in order to disable dragging with keyboard
    // It doesn't work if placed in componentWillMount
    window.addEventListener("keydown", stopImmediatePropagation, true);
  }

  componentDidMount() {
    const columnsLength = Object.keys(this.props.columns).length;
    VIEWPORT_WIDTH = this.el.offsetWidth / columnsLength;
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", stopImmediatePropagation, true);
  }

  handleDragEnd({ source, destination }) {
    if (destination) {
      const { columns, moveTask } = this.props;
      const draggedTaskId = columns[source.droppableId].tasks[source.index];
      const destinationColumnId = columns[destination.droppableId].id;

      moveTask(draggedTaskId, destinationColumnId, destination.index);
    }
    console.log(window.scrollX);
    this.setState({
      swipeStyle: {
        position: "fixed",
        left: `${-1 * window.scrollX}px`
      }
    });
  }

  handleSwipeLeft() {
    const { swipeStyle } = this.state;
    const left = parseInt(swipeStyle.left);
    let columnIndexInView = getColumnIndexAtPosition(left);

    if (columnIndexInView < 2) {
      this.setState({
        swipeStyle: {
          ...swipeStyle,
          ...getColumnTransitionStyle(columnIndexInView + 1)
        }
      });
    }
  }

  handleSwipeRight() {
    const { swipeStyle } = this.state;
    const left = Math.abs(parseInt(swipeStyle.left));
    let columnIndexInView = getColumnIndexAtPosition(left);
    const isInTheMiddleOfTwoColumns = !Number.isInteger(left / VIEWPORT_WIDTH);

    if (isInTheMiddleOfTwoColumns) {
      // If we are in the middle of two columns
      // set the view to the one on the right
      columnIndexInView = columnIndexInView + 1;
    }

    if (columnIndexInView > 0) {
      this.setState({
        swipeStyle: {
          ...swipeStyle,
          ...getColumnTransitionStyle(columnIndexInView - 1)
        }
      });
    }
  }

  handleOnBeforeDragCapture() {
    const { swipeStyle } = this.state;
    this.setState({
      swipeStyle: {
        ...swipeStyle,
        position: "initial"
      }
    });
    // This is needed if we have swiped to other columns previously
    // It prevents jumping to the first column when drag starts
    // For some reason (-1 * parseInt(swipeStyle.left)) may equal -0
    window.scroll(parseInt(-1 * parseInt(swipeStyle.left)), 0);
  }

  render() {
    const { columns, tasks } = this.props;
    const { swipeStyle } = this.state;
    const hasTasks = Object.keys(tasks).length > 0;

    return (
      <Swipeable
        minDistance={100}
        onSwipeLeft={this.handleSwipeLeft}
        onSwipeRight={this.handleSwipeRight}
      >
        {innerRef => (
          <div
            className="Board"
            ref={el => {
              this.el = el;
              innerRef(el);
            }}
            style={{ ...swipeStyle }}
          >
            <DragDropContext
              onDragEnd={this.handleDragEnd}
              onBeforeCapture={this.handleOnBeforeDragCapture}
            >
              {Object.values(columns).map(column => (
                <Droppable
                  key={column.id}
                  droppableId={column.id}
                  type="COLUMN"
                >
                  {(provided, snapshot) => (
                    <Column
                      id={column.id}
                      name={column.name}
                      count={column.tasks.length}
                      // Drag&Drop related props
                      innerRef={provided.innerRef}
                      droppableProps={provided.droppableProps}
                    >
                      {hasTasks &&
                        column.tasks.map(
                          (taskId, taskIndex) =>
                            tasks[taskId] && (
                              <Draggable
                                draggableId={taskId}
                                index={taskIndex}
                                key={taskId}
                                disableInteractiveElementBlocking
                              >
                                {(provided, snapshot) => (
                                  // TODO: Think about removing this wrapper
                                  // at some point and use <Task /> directly
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Task
                                      id={taskId}
                                      text={tasks[taskId].text}
                                      // Drag&Drop related props
                                      isDragging={snapshot.isDragging}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            )
                        )}
                      {provided.placeholder}
                    </Column>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        )}
      </Swipeable>
    );
  }
}

Board.propTypes = {
  columns: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  moveTask: PropTypes.func.isRequired
};

export default connect(null, {
  moveTask
})(Board);
