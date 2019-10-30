import React, { Component } from "react";
import PropTypes from "prop-types";

// Code splitting
const COMPONENT_URLS = [
  () => import("../../desktop/components/Task/Task"),
  () => import("../../touch/components/Task/Task")
];

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Component: null
    };

    COMPONENT_URLS[Number(props.isTouch)]().then(Component => {
      this.setState({ Component: Component.default });
    });
  }

  render() {
    const { Component } = this.state;
    return Component ? <Component {...this.props} /> : null;
  }
}

Task.propTypes = {
  isTouch: PropTypes.bool.isRequired
};
