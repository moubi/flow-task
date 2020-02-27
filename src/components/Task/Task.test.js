import expect, {
  simulate,
  getInstance,
  PropUpdater
} from "../../testUtils/unexpected-react";
import React from "react";
import sinon from "sinon";

import { Task } from "./Task";

// Fake reseting cursor position related document methods
document.execCommand = null;
document.getSelection = null;
let collapseToEnd;

let props;

describe("Task", () => {
  beforeEach(() => {
    props = {
      id: "1",
      text: "",
      isDragging: false,
      completeTask: sinon.stub().named("completeTask"),
      updateTask: sinon.stub().named("updateTask"),
      deleteTaskAndUpdateColumn: sinon.stub().named("deleteTaskAndUpdateColumn")
    };

    // Fake reseting cursor position related document methods
    document.execCommand = sinon.stub().named("execCommand");
    collapseToEnd = sinon.stub().named("collapseToEnd");
    document.getSelection = function() {
      this.collapseToEnd = collapseToEnd;
      return this;
    };
  });

  it("should render default", () => {
    return expect(
      <Task {...props} />,
      "when mounted",
      "to exhaustively satisfy",
      <div id="1" className="Task">
        <div className="Task-text" contentEditable />
        <div className="Task-options">
          <span className="Task-options-complete">complete</span>
          <span className="Task-options-delete">delete</span>
        </div>
      </div>
    );
  });

  it("should render with text", () => {
    props.text = "Visit parents";

    return expect(
      <Task {...props} />,
      "when mounted",
      "queried for first",
      ".Task-text",
      "to have text",
      "Visit parents"
    );
  });

  it("should render in dragging mode", () => {
    props.isDragging = true;

    return expect(
      <Task {...props} />,
      "when mounted",
      "to have class",
      "Task--dragging"
    );
  });

  it("should place the cursor at the text end when focusing", () => {
    props.text = "Visit parents";

    const { subject } = getInstance(<Task {...props} />);

    simulate(subject, {
      type: "touchEnd",
      target: ".Task-text"
    });

    return expect(
      document.execCommand,
      "to have a call exhaustively satisfying",
      ["selectAll", false, null]
    ).then(() => expect(collapseToEnd, "was called"));
  });

  it("should NOT focus while dragging", () => {
    props.text = "Visit parents";
    props.isDragging = true;

    const { subject } = getInstance(<Task {...props} />);

    simulate(subject, {
      type: "touchEnd",
      target: ".Task-text"
    });

    return expect(document.execCommand, "was not called").then(() =>
      expect(collapseToEnd, "was not called")
    );
  });

  it("should edit task's text", () => {
    props.text = "Visit parents";
    const clock = sinon.useFakeTimers();

    const updatedProps = {
      ...props,
      text: "Visit my father",
      // Need key update to force rerender of the component
      // shouldComponentUpdate does not currently react on text change
      key: 1
    };

    const { applyPropsUpdate, subject } = getInstance(
      <PropUpdater propsUpdate={updatedProps}>
        <Task {...props} key={0} />
      </PropUpdater>
    );

    simulate(subject, {
      type: "input",
      target: ".Task-text",
      data: {
        target: {
          innerText: "Visit my father"
        }
      }
    });

    applyPropsUpdate();

    return expect(
      subject,
      "queried for first",
      ".Task-text",
      "to have text",
      "Visit my father"
    ).then(() => {
      // Handling debaunce
      clock.tick(500);

      return expect(
        props.updateTask,
        "to have a call exhaustively satisfying",
        ["1", { text: "Visit my father" }]
      );
    });
  });

  it("should open options menu", () => {
    const { subject, instance } = getInstance(<Task {...props} />);

    // TODO: find a way to do that with simulate()
    instance.handleSwipeLeft();

    return expect(subject, "to have class", "Task--isOptionsMenuShown");
  });

  it("should close options menu", () => {
    const { subject, instance } = getInstance(<Task {...props} />);

    // TODO: find a way to do that with simulate()
    instance.handleSwipeLeft();
    instance.handleSwipeRight();

    return expect(subject, "to satisfy", {
      attributes: {
        class: expect.it("not to contain", "Task--isOptionsMenuShown")
      }
    });
  });

  it("should delete a task", () => {
    const { subject, instance } = getInstance(<Task {...props} />);

    // TODO: find a way to do that with simulate()
    instance.handleSwipeLeft();

    simulate(subject, {
      type: "click",
      target: ".Task-options-delete"
    });

    return expect(
      props.deleteTaskAndUpdateColumn,
      "to have a call exhaustively satisfying",
      ["1"]
    ).then(() =>
      expect(subject, "to satisfy", {
        attributes: {
          class: expect.it("not to contain", "Task--isOptionsMenuShown")
        }
      })
    );
  });

  it("should complete a task", () => {
    const { subject, instance } = getInstance(<Task {...props} />);

    // TODO: find a way to do that with simulate()
    instance.handleSwipeLeft();

    simulate(subject, {
      type: "click",
      target: ".Task-options-complete"
    });

    return expect(
      props.completeTask,
      "to have a call exhaustively satisfying",
      ["1"]
    ).then(() =>
      expect(subject, "to satisfy", {
        attributes: {
          class: expect.it("not to contain", "Task--isOptionsMenuShown")
        }
      })
    );
  });
});
