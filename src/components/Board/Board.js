import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Column from "../Column/Column";
import Task from "../Task/Task";

import { moveTask } from "../../store/actions";

import "./Board.scss";

const stopImmediatePropagation = e => {
  e.stopImmediatePropagation();
};

export class Board extends Component {
  constructor(props) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);
    // This is needed in order to disable dragging with keyboard
    // It doesn't work if placed in componentWillMount
    window.addEventListener("keydown", stopImmediatePropagation, true);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", stopImmediatePropagation, true);
  }

  handleDragEnd({ source, destination }) {
    if (!destination) {
      return;
    }

    const { columns, moveTask } = this.props;
    const draggedTaskId = columns[source.droppableId].tasks[source.index];
    const destinationColumnId = columns[destination.droppableId].id;

    moveTask(draggedTaskId, destinationColumnId, destination.index);
  }

  render() {
    const { columns, tasks } = this.props;
    const hasTasks = Object.keys(tasks).length > 0;

    return (
      <div className="Board">
        <DragDropContext onDragEnd={this.handleDragEnd}>
          {Object.values(columns).map(column => (
            <Droppable key={column.id} droppableId={column.id} type="COLUMN">
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
                              // at some point and use <Tack /> directly
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
