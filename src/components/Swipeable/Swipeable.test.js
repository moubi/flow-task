import expect, {
  Mounter,
  getInstance
} from "../../testUtils/unexpected-react";
import React from "react";
import sinon from "sinon";

import Swipeable from "./Swipeable";

let props;

describe("Swipeable", () => {
  beforeEach(() => {
    props = {
      children: (innerRef => (
        <div
          className="ElementToSwipe"
          ref={innerRef}
        >
          Swipe me!
        </div>)
      ),
      onSwipeLeft: sinon.stub().named("onSwipeLeft"),
      onSwipeRight: sinon.stub().named("onSwipeRight"),
      onSwipeUp: sinon.stub().named("onSwipeUp"),
      onSwipeDown: sinon.stub().named("onSwipeDown")
    };
  });

  it("should render default", () => {
    return expect(
      <Swipeable {...props} />,
      "when mounted",
      "to exhaustively satisfy",
      <div className="ElementToSwipe">Swipe me!</div>
    );
  });
});
