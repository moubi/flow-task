import React, { Component } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";
import { debounce } from "lodash";
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
      columns: props.data.columns,
      draggedData: {}
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
    this.handleTaskAddition = this.handleTaskAddition.bind(this);
    this.saveBoardDataWithDelay = debounce(saveBoardData, 500);
  }

  handleDragStart(task, sourceColumnId) {
    this.setState({
      draggedData: {
        task,
        sourceColumnId
      }
    });
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    const { task: draggedTask, sourceColumnId } = this.state.draggedData;

    if (e.target === null || !draggedTask) {
      return;
    }
    const dropColumnId = e.target.id;

    const { columns } = this.state;
    const dropColumn = columns[dropColumnId];
    const sourceColumn = columns[sourceColumnId];

    // TODO: Handle the case when we should reorder in the same column
    if (dropColumnId !== sourceColumnId) {
      dropColumn.tasks = [...new Set([...dropColumn.tasks, draggedTask])];
      sourceColumn.tasks = sourceColumn.tasks.filter(
        task => task.id !== draggedTask.id
      );
    }

    const reorderedColumns = {
      ...columns,
      [dropColumnId]: {
        ...dropColumn
      },
      [sourceColumnId]: {
        ...sourceColumn
      }
    };

    this.setState(
      {
        draggedData: {},
        columns: reorderedColumns
      },
      () => {
        saveBoardData({ columns: reorderedColumns });
      }
    );
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
    const { columns, draggedData } = this.state;
    const draggedTaskId = draggedData.task ? draggedData.task.id : null;

    return (
      <div className="Board">
        {Object.values(columns).map(column => (
          <Column
            id={column.id}
            key={column.id}
            name={column.name}
            count={column.tasks.length}
            onAdd={
              column.id === FIRST_COLUMN_ID ? this.handleTaskAddition : null
            }
            onDrop={this.handleDrop}
            onDragOver={this.handleDragOver}
          >
            {column.tasks.map((task, taskIndex) => (
              <Task
                id={task.id}
                key={task.id}
                isDragging={draggedTaskId === task.id}
                text={task.text}
                onChange={value =>
                  this.handleTaskTextChange(taskIndex, column.id, value)
                }
                onDelete={() => this.handleTaskDeletion(taskIndex, column.id)}
                onDragStart={() => this.handleDragStart(task, column.id)}
              />
            ))}
          </Column>
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  isTouch: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};
