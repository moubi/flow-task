import expect, {
  withStore,
  Ignore,
  simulate,
  getInstance
} from "../../testUtils/unexpected-react";
import React from "react";
import sinon from "sinon";

import { Board as Board_ } from "./Board";

const Board = withStore(Board_);
let props;

describe("Column", () => {
  beforeEach(() => {
    props = {
      columns: {
        "0": {
          id: "0",
          name: "To do",
          tasks: ["1", "2"]
        },
        "1": {
          id: "1",
          name: "Doing",
          tasks: ["3"]
        },
        "2": {
          id: "2",
          name: "Done",
          tasks: []
        }
      },
      tasks: {},
      moveTask: sinon.stub().named("moveTask")
    };
  });

  it("should render default", () => {
    return expect(
      <Board {...props} />,
      "when mounted",
      "to exhaustively satisfy",
      <div className="Board" style={{left: "0px"}}>
        <div id="0" name="To do" className="Column">
          <Ignore />
          <Ignore />
        </div>
        <div id="1" name="Doing" className="Column">
          <Ignore />
          <Ignore />
        </div>
        <div id="2" name="Done" className="Column">
          <Ignore />
          <Ignore />
        </div>
      </div>
    );
  });

  it("should render with tasks", () => {
    props.columns = {
      ...props.columns,
      "0": {
        ...props.columns["0"],
        tasks: ["1", "2"]
      },
    };
    props.tasks = {
      "1": { text: "Buy some cakes" },
      "2": { text: "Visit parents" }
    };

    return expect(
      <Board {...props} />,
      "when mounted",
      "queried for first",
      ".Column .Column-body",
      "to exhaustively satisfy",
      <div
        className="Column-body"
        data-rbd-droppable-id="0"
        data-rbd-droppable-context-id="1"
      >
        <div
          data-rbd-draggable-context-id="1"
          data-rbd-draggable-id="1"
          tabindex="0"
          data-rbd-drag-handle-draggable-id="1"
          data-rbd-drag-handle-context-id="1"
          aria-labelledby="rbd-lift-instruction-1"
          draggable="false"
        >
          <div id="1" className="Task">
            <Ignore />
            <Ignore />
          </div>
        </div>
        <div
          data-rbd-draggable-context-id="1"
          data-rbd-draggable-id="2"
          tabindex="0"
          data-rbd-drag-handle-draggable-id="2"
          data-rbd-drag-handle-context-id="1"
          aria-labelledby="rbd-lift-instruction-1"
          draggable="false"
        >
          <div id="2" className="Task">
            <Ignore />
            <Ignore />
          </div>
        </div>
      </div>
    );
  });

  it.only("should move a task", () => {
    props.columns = {
      ...props.columns,
      "0": {
        ...props.columns["0"],
        tasks: ["1", "2"]
      },
    };
    props.tasks = {
      "1": { text: "Buy some cakes" },
      "2": { text: "Visit parents" }
    };

    const { instance } = getInstance(<Board {...props} />);

    instance.handleDragEnd({
      source: { droppableId: "0", index: 0 },
      droppable: { droppableId: "0", index: 1 }
    });

    return expect(
      props.moveTask,
      "to have a call exhaustively satisfying",
      ["1", "0", 1]
    );
  });
});
