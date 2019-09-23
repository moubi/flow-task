import React, { Component } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";
import { saveBoardData } from "../../store/actions";

import Column from "../Column/Column";
import Task from "../Task/Task";

import "./Board.scss";

const FIRST_COLUMN = 0;

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
    saveBoardData({ columns: reorderedColumns }).then(data => {
      this.setState({
        draggedData: {},
        columns: reorderedColumns
      });
    });
  }

  handleTaskTextChange(taskIndex, columnIndex, value) {
    const { columns } = this.state;
    columns[columnIndex].tasks[taskIndex].text = value;
    this.setState({ columns });
  }

  handleTaskAddition() {
    const { columns } = this.state;
    // Add the new task to first position
    columns[FIRST_COLUMN].tasks = [getNewTask()].concat(
      columns[FIRST_COLUMN].tasks
    );
    this.setState({ columns });
  }

  render() {
    const { columns, draggedData } = this.state;
    const draggedTaskId = draggedData.task ? draggedData.task.id : null;

    return (
      <div className="Board">
        {Object.values(columns).map((column, columnIndex) => (
          <Column
            id={column.id}
            key={column.id}
            name={column.name}
            count={column.tasks.length}
            onAdd={
              columnIndex === FIRST_COLUMN ? this.handleTaskAddition : null
            }
            onDrop={this.handleDrop}
            onDragOver={this.handleDragOver}
          >
            {column.tasks.map((task, taskIndex) => (
              <Task
                id={task.id}
                key={task.id}
                isDragging={draggedTaskId === task.id}
                onChange={value =>
                  this.handleTaskTextChange(taskIndex, columnIndex, value)
                }
                onDragStart={() => this.handleDragStart(task, column.id)}
              >
                {task.text}
              </Task>
            ))}
          </Column>
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  data: PropTypes.object.isRequired
};
