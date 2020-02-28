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
    props.id = "d1ea1845-86e2-4c46-976c-8b09ba4786e5";

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

    return expect(<Column {...props} />, "when mounted", "to have attributes", {
      style: "width: 100px"
    });
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
    props.id = "d1ea1845-86e2-4c46-976c-8b09ba4786e5";
    const { subject } = getInstance(<Column {...props} />);

    simulate(subject, {
      type: "touchEnd",
      target: ".Column-plus"
    });

    return expect(props.createTaskInColumn, "was called");
  });

  it("should set the ref", () => {
    getInstance(<Column {...props} />);

    return expect(props.innerRef, "was called");
  });
});
