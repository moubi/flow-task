import unexpected from "unexpected";
import unexpectedDom from "unexpected-dom";
import unexpectedReaction from "unexpected-reaction";
import ReactDom from "react-dom";
import React, { Component } from "react";
import unexpectedSinon from "unexpected-sinon";
import PropTypes from "prop-types";

import FakeReduxProvider from "./FakeReduxProvider";

const expect = unexpected
  .clone()
  .use(unexpectedDom)
  .use(unexpectedReaction)
  .use(unexpectedSinon);

export class Mounter extends Component {
  render() {
    return <div className="Mounter">{this.props.children}</div>;
  }
}

Mounter.propTypes = {
  children: PropTypes.node
};

export function getInstance(reactElement, tagName = "div") {
  const div = document.createElement(tagName);
  const element = ReactDom.render(reactElement, div);

  return {
    instance: element,
    subject: div.firstChild
  };
}

export function withStore(Component, initialState, mockApi, reducer) {
  return props => (
    <FakeReduxProvider
      initialState={initialState}
      mockApi={mockApi}
      reducer={reducer}
    >
      <Component {...props} />
    </FakeReduxProvider>
  );
}

export { Ignore, simulate } from "react-dom-testing";
export default expect;
