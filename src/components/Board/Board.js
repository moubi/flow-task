import React, { Component } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { saveBoardData } from "../../store/actions";

import Column from "../Column/Column";
import Task from "../Task/Task";

import "./Board.scss";

// TODO: Figure out a better way
const FIRST_COLUMN_ID = "d1ea1845-86e2-4c46-976c-8b09ba4786e5";
const LAST_COLUMN_ID = "24f4dcf8-b471-488c-a1be-b56ea116e712";

const getNewTask = () => ({
  id: uuid(),
  value: ""
});

const stopImmediatePropagation = e => {
  e.stopImmediatePropagation()
};

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: props.data.columns,
      tasks: props.data.tasks
    };

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
    this.handleTaskAddition = this.handleTaskAddition.bind(this);
    this.handleTaskCompletion = this.handleTaskCompletion.bind(this);
    this.saveBoardDataWithDelay = debounce(saveBoardData, 500);
    // This is needed in order to disable dragging with keyboard
    // It doesn't work if placed in componentWillMount
    window.addEventListener("keydown", stopImmediatePropagation, true);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", stopImmediatePropagation, true);
  }

  handleDragEnd(options) {
    if (!options.destination) {
      return;
    }

    const { columns } = this.state;
    const destinationIndex = options.destination.index;
    const destinationColumn = columns[options.destination.droppableId];
    const sourceIndex = options.source.index;
    const sourceColumn = columns[options.source.droppableId];
    const draggedTask = sourceColumn.tasks[sourceIndex];

    sourceColumn.tasks.splice(sourceIndex, 1);
    destinationColumn.tasks.splice(destinationIndex, 0, draggedTask);

    this.setState({ ...this.state, columns }, () => {
      saveBoardData({ ...this.state });
    });
  }

  handleTaskTextChange(taskId, value) {
    const { tasks } = this.state;
    tasks[taskId].text = value;
    this.setState({ tasks }, () => {
      this.saveBoardDataWithDelay({ ...this.state });
    });
  }

  handleTaskDeletion(taskIndex, columnId) {
    const { columns, tasks } = this.state;
    delete tasks[columns[columnId].tasks[taskIndex]];
    columns[columnId].tasks.splice(taskIndex, 1);

    this.setState({ columns, tasks }, () => {
      saveBoardData({ ...this.state });
    });
  }

  handleTaskCompletion(taskIndex, columnId) {
    const { columns } = this.state;
    // Do nothing if we are trying to complete completed task
    if (columnId === LAST_COLUMN_ID) {
      return;
    }
    columns[LAST_COLUMN_ID].tasks.push(columns[columnId].tasks[taskIndex]);
    columns[columnId].tasks.splice(taskIndex, 1);

    this.setState({ columns }, () => {
      saveBoardData({ ...this.state });
    });
  }

  handleTaskAddition() {
    const { columns, tasks } = this.state;
    // Add the new task to first position
    const newTask = getNewTask();
    columns[FIRST_COLUMN_ID].tasks = [newTask.id].concat(
      columns[FIRST_COLUMN_ID].tasks
    );
    tasks[newTask.id] = newTask;

    this.setState({ columns, tasks }, () => {
      saveBoardData({ ...this.state });
    });
  }

  render() {
    const { columns, tasks } = this.state;

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
                  onAdd={
                    column.id === FIRST_COLUMN_ID
                      ? this.handleTaskAddition
                      : null
                  }
                  // Drag&Drop related props
                  innerRef={provided.innerRef}
                  droppableProps={provided.droppableProps}
                >
                  {column.tasks.map((taskId, taskIndex) => (
                    <Draggable
                      draggableId={taskId}
                      index={taskIndex}
                      key={taskId}
                      disableInteractiveElementBlocking
                    >
                      {(provided, snapshot) => (
                        // TODO: the reason a <div /> wrapper is used here
                        // is because Task has a dynamic loader which does not
                        // return component on first load
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            id={taskId}
                            text={tasks[taskId].text}
                            onChange={value =>
                              this.handleTaskTextChange(
                                taskId,
                                value
                              )
                            }
                            onDelete={() =>
                              this.handleTaskDeletion(taskIndex, column.id)
                            }
                            onComplete={() => {
                              this.handleTaskCompletion(taskIndex, column.id);
                            }}
                            // Drag&Drop related props
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
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
  data: PropTypes.object.isRequired
};
