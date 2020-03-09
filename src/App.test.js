import expect, { withStore } from "./testUtils/unexpected-react";
import React from "react";

import { App } from "./App";

let props;

// Disable react-beautiful-dnd warnings since they
// do not impract the test results
window["__react-beautiful-dnd-disable-dev-warnings"] = true;

describe("App", () => {
  beforeEach(() => {
    props = {
      columns: {},
      tasks: {},
      tasksFetching: false
    };
  });

  it("should render default", () => {
    expect(
      <App {...props} />,
      "when mounted",
      "to exhaustively satisfy",
      <div className="Loader">Loading...</div>
    );
  });

  it("should show loading if tasks are not ready", () => {
    props = {
      ...props,
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
      tasksFetching: true
    };

    expect(
      <App {...props} />,
      "when mounted",
      "to exhaustively satisfy",
      <div className="Loader">Loading...</div>
    );
  });

  it("should render the board", () => {
    props = {
      ...props,
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
      tasks: {
        "1": { text: "Buy some cakes" },
        "2": { text: "Visit parents" },
        "3": { text: "Prepare for the next Math exam" }
      }
    };

    const AppWithAStore = withStore(App);

    expect(
      <AppWithAStore {...props} />,
      "when mounted",
      "to have class",
      "Board"
    );
  });
});
