import React, { Component } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { saveBoardData } from "../../store/actions";

import Column from "../Column/Column";
import Task from "../Task/Task";

import "./Board.scss";

// TODO: Figure out a better way
const FIRST_COLUMN_ID = "d1ea1845-86e2-4c46-976c-8b09ba4786e5";

const getNewTask = () => ({
  id: uuid(),
  value: ""
});

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: props.data.columns
    };

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
    this.handleTaskAddition = this.handleTaskAddition.bind(this);
    this.saveBoardDataWithDelay = debounce(saveBoardData, 500);
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

    this.setState({ columns }, () => {
      saveBoardData({ columns });
    });
  }

  handleTaskTextChange(taskIndex, columnId, value) {
    const { columns } = this.state;
    columns[columnId].tasks[taskIndex].text = value;
    this.setState({ columns }, () => {
      this.saveBoardDataWithDelay({ columns });
    });
  }

  handleTaskDeletion(taskIndex, columnId) {
    const { columns } = this.state;
    columns[columnId].tasks.splice(taskIndex, 1);

    this.setState({ columns }, () => {
      this.saveBoardDataWithDelay({ columns });
    });
  }

  handleTaskAddition() {
    const { columns } = this.state;
    // Add the new task to first position
    columns[FIRST_COLUMN_ID].tasks = [getNewTask()].concat(
      columns[FIRST_COLUMN_ID].tasks
    );
    this.setState({ columns }, () => {
      saveBoardData({ columns });
    });
  }

  render() {
    const { columns } = this.state;

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
                  {column.tasks.map((task, taskIndex) => (
                    <Draggable
                      draggableId={task.id}
                      index={taskIndex}
                      key={task.id}
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
                            id={task.id}
                            text={task.text}
                            onChange={value =>
                              this.handleTaskTextChange(
                                taskIndex,
                                column.id,
                                value
                              )
                            }
                            onDelete={() =>
                              this.handleTaskDeletion(taskIndex, column.id)
                            }
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
