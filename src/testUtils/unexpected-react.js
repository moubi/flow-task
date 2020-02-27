import unexpected from "unexpected";
import unexpectedDom from "unexpected-dom";
import unexpectedReaction from "unexpected-reaction";
import ReactDom from "react-dom";
import React, { Component } from "react";
import unexpectedSinon from "unexpected-sinon";
import PropTypes from "prop-types";
import { simulate } from "react-dom-testing";

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

  const result = {
    instance: element,
    subject: div.firstChild
  };

  if (reactElement.type === PropUpdater) {
    result.applyPropsUpdate = () =>
      simulate(result.subject.firstChild, { type: "click" });
  }

  return result;
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

export class PropUpdater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    };
  }

  render() {
    const { children, propsUpdate } = this.props;
    const { isClicked } = this.state;

    let child;
    if (isClicked) {
      child = React.cloneElement(children, propsUpdate);
    } else {
      child = children;
    }

    return (
      <div onClick={() => this.setState({ isClicked: true })}>{child}</div>
    );
  }
}

PropUpdater.propTypes = {
  children: PropTypes.element.isRequired,
  propsUpdate: PropTypes.object.isRequired
};

export { Ignore, simulate } from "react-dom-testing";
export default expect;
