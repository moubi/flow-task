import expect, {
  simulate,
  getInstance
} from "../../testUtils/unexpected-react";
import React from "react";
import sinon from "sinon";

import { Column } from "./Column";

let props;

describe("Column", () => {
  beforeEach(() => {
    props = {
      id: "1",
      name: "Doing",
      count: 0,
      droppableProps: {},
      innerRef: sinon.stub().named("innerRef"),
      createTaskInColumn: sinon.stub().named("createTaskInColumn"),
      children: null
    };
  });

  it("should render default", () => {
    return expect(
      <Column {...props} />,
      "when mounted",
      "to exhaustively satisfy",
      <div id="1" name="Doing" className="Column">
        <header>
          <h2>
            {"Doing"} ({"0"})
          </h2>
        </header>
        <div className="Column-body" />
      </div>
    );
  });

  it("should render first column", () => {
    props.name = "To Do";

    return expect(
      <Column {...props} />,
      "when mounted",
      "to contain elements matching",
      "[class=Column-plus]"
    );
  });

  it("should render with additional styling from droppableProps", () => {
    props.droppableProps = {
      style: { width: "100px" }
    };

    return expect(
      <Column {...props} />,
      "when mounted",
      "queried for first",
      ".Column-body",
      "to have attributes",
      {
        style: "width: 100px"
      }
    );
  });

  it("should render with children", () => {
    props.children = <div>I am a task</div>;

    return expect(
      <Column {...props} />,
      "when mounted",
      "queried for first",
      ".Column-body",
      "to contain",
      "<div>I am a task</div>"
    );
  });

  it("should create task in column", () => {
    props.name = "To Do";
    const { subject, instance } = getInstance(<Column {...props} />);

    simulate(subject, {
      type: "touchEnd",
      target: ".Column-plus"
    });
    return expect(props.createTaskInColumn, "was called").then(() =>
      expect(instance.el.scrollTop, "to be", 0)
    );
  });

  it("should set the ref", () => {
    getInstance(<Column {...props} />);

    return expect(props.innerRef, "was called");
  });
});
