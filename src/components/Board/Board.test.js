import expect, {
  Mounter,
  withStore,
  Ignore,
  getInstanceWithStore
} from "../../testUtils/unexpected-react";
import React from "react";
import sinon from "sinon";

import { Board as BoardUnconnected, VIEWPORT_WIDTH } from "./Board";

const Board = withStore(BoardUnconnected);
let props;

// Return the hardcoded width of the board.
// It is set to 960 - 3 columns * 320 (iPhone SE screen size)
// https://github.com/jsdom/jsdom/issues/135#issuecomment-68191941
Object.defineProperties(window.HTMLElement.prototype, {
  offsetWidth: {
    get: () => 960
  }
});

describe("Board", () => {
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
      <div className="Board" style={{ left: "0px" }}>
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
      }
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

  it("should move a task within a column", () => {
    props.columns = {
      ...props.columns,
      "0": {
        ...props.columns["0"],
        tasks: ["1", "2"]
      }
    };
    props.tasks = {
      "1": { text: "Buy some cakes" },
      "2": { text: "Visit parents" }
    };

    let instance = null;
    const { subject } = getInstanceWithStore(
      <BoardUnconnected
        {...props}
        ref={el => {
          instance = el;
        }}
      />
    );

    instance.handleDragEnd({
      source: { droppableId: "0", index: 0 },
      destination: { droppableId: "0", index: 1 }
    });

    return expect(subject, "to have attributes", {
      style: {
        position: "fixed",
        left: "0px"
      }
    }).then(() =>
      expect(props.moveTask, "to have a call exhaustively satisfying", [
        "1",
        "0",
        1
      ])
    );
  });

  it("should NOT move a task if drop is unsuccessful", () => {
    props.columns = {
      ...props.columns,
      "0": {
        ...props.columns["0"],
        tasks: ["1", "2"]
      }
    };
    props.tasks = {
      "1": { text: "Buy some cakes" },
      "2": { text: "Visit parents" }
    };

    let instance = null;
    getInstanceWithStore(
      <BoardUnconnected
        {...props}
        ref={el => {
          instance = el;
        }}
      />
    );

    instance.handleDragEnd({
      source: { droppableId: "0", index: 0 },
      destination: null
    });

    return expect(props.moveTask, "was not called");
  });

  it("should preset draggable styling before drag starts", () => {
    window.scroll = sinon.stub().named("scroll");

    let instance = null;
    const { subject } = getInstanceWithStore(
      <BoardUnconnected
        {...props}
        ref={el => {
          instance = el;
        }}
      />
    );

    instance.handleOnBeforeDragCapture();

    return expect(subject, "to have attributes", {
      style: { left: "0px", position: "initial" }
    }).then(() =>
      expect(window.scroll, "to have a call exhaustively satisfying", [0, 0])
    );
  });

  it("should set the viewport width", () => {
    getInstanceWithStore(
      <Mounter>
        <Board {...props} />
      </Mounter>
    );

    return expect(VIEWPORT_WIDTH, "to be", 320);
  });

  it("should swipe to the second column", () => {
    let instance = null;
    const { subject } = getInstanceWithStore(
      <Mounter>
        <BoardUnconnected
          {...props}
          ref={el => {
            instance = el;
          }}
        />
      </Mounter>
    );

    instance.handleSwipeLeft();

    return expect(
      subject,
      "queried for first",
      ".Board",
      "to have attributes",
      {
        style: {
          left: "-320px",
          transition: "left 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)"
        }
      }
    );
  });

  it("should NOT swipe further right when viewing last column", () => {
    let instance = null;
    const { subject } = getInstanceWithStore(
      <Mounter>
        <BoardUnconnected
          {...props}
          ref={el => {
            instance = el;
          }}
        />
      </Mounter>
    );

    instance.handleSwipeLeft();
    instance.handleSwipeLeft();
    instance.handleSwipeLeft();

    return expect(
      subject,
      "queried for first",
      ".Board",
      "to have attributes",
      {
        style: {
          left: "-640px",
          transition: "left 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)"
        }
      }
    );
  });

  it("should NOT swipe further left when viewing first column", () => {
    let instance = null;
    const { subject } = getInstanceWithStore(
      <Mounter>
        <BoardUnconnected
          {...props}
          ref={el => {
            instance = el;
          }}
        />
      </Mounter>
    );

    instance.handleSwipeRight();

    return expect(
      subject,
      "queried for first",
      ".Board",
      "to have attributes",
      {
        style: {
          left: "0px"
        }
      }
    );
  });

  it("should swipe from third to the second column", () => {
    let instance = null;
    const { subject } = getInstanceWithStore(
      <Mounter>
        <BoardUnconnected
          {...props}
          ref={el => {
            instance = el;
          }}
        />
      </Mounter>
    );

    instance.handleSwipeLeft();
    instance.handleSwipeLeft();
    instance.handleSwipeRight();

    return expect(
      subject,
      "queried for first",
      ".Board",
      "to have attributes",
      {
        style: {
          left: "-320px",
          transition: "left 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)"
        }
      }
    );
  });

  it.only("should swipe to first column beeing between the first and second one", () => {
    props.tasks = {
      "1": { text: "Buy some cakes" },
      "2": { text: "Visit parents" }
    };
    props.columns = {
      ...props.columns,
      "0": {
        ...props.columns["0"],
        tasks: ["1"]
      },
      "1": {
        ...props.columns["1"],
        tasks: ["2"]
      }
    };
    let instance = null;
    const { subject } = getInstanceWithStore(
      <Mounter>
        <BoardUnconnected
          {...props}
          ref={el => {
            instance = el;
          }}
        />
      </Mounter>
    );

    Object.defineProperties(window, {
      scrollX: {
        get: () => -117
      }
    });

    instance.handleDragEnd({
      source: { droppableId: "0", index: 0 },
      destination: { droppableId: "1", index: 0 }
    });

    instance.handleSwipeLeft();
    instance.handleSwipeLeft();
    instance.handleSwipeRight();

    return expect(
      subject,
      "queried for first",
      ".Board",
      "to have attributes",
      {
        style: {
          left: "-320px",
          transition: "left 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)"
        }
      }
    );
  });
});
