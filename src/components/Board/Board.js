import React, { Component } from "react";
import uuid from "uuid/v4";

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
      columns: {
        "d1ea1845-86e2-4c46-976c-8b09ba4786e5": {
          id: "d1ea1845-86e2-4c46-976c-8b09ba4786e5",
          name: "To do",
          tasks: [
            {
              id: "e25b1d95-3f86-4d5e-a05d-f6f1cac1c275",
              text: "This is an example task"
            },
            {
              id: "1d2efb70-2e87-4c96-bef6-71524ba01d34",
              text: "Go to Netto and buy something to eat"
            }
          ]
        },
        "24f4dcf8-b471-488c-a1be-b56ea116e712": {
          id: "24f4dcf8-b471-488c-a1be-b56ea116e712",
          name: "Doing",
          tasks: [
            {
              id: "2a371cb5-25a4-414c-8a6b-71a226831a14",
              text: "Create a menu for next week"
            }
          ]
        },
        "200c95b8-d2f7-4173-b086-33be8ade92b0": {
          id: "200c95b8-d2f7-4173-b086-33be8ade92b0",
          name: "Done",
          tasks: [
            {
              id: "7fd3ef5f-27d6-45b4-b1b6-0ad7730cdba7",
              text: "Buy some cake"
            },
            {
              id: "73169a85-6b1e-4635-967e-68cc4d0af26d",
              text: "Write your homework"
            },
            {
              id: "b25dd012-c062-4f37-8ce8-378a5e065977",
              text: "Plan your parents stay"
            }
          ]
        }
      },
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
      sourceColumn.tasks = sourceColumn.tasks.filter(task => task.id !== draggedTask.id);
    }

    this.setState({
      draggedData: {},
      columns: {
          ...columns,
          [dropColumnId]: {
            ...dropColumn
          },
          [sourceColumnId]: {
            ...sourceColumn
          }
      }
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
