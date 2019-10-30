import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isTouch } from "../../store/selectors";

// Code splitting
const COMPONENT_URLS = [
  componentName =>
    import(`../../desktop/components/${componentName}/${componentName}`),
  componentName =>
    import(`../../touch/components/${componentName}/${componentName}`)
];

export class DynamicImport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Component: null
    };

    COMPONENT_URLS[Number(props.isTouch)](props.componentName).then(
      Component => {
        this.setState({ Component: Component.default });
      }
    );
  }

  render() {
    const { Component } = this.state;
    const { isTouch, componentName, ...componentProps } = this.props;
    return Component ? <Component {...componentProps} /> : null;
  }
}

DynamicImport.propTypes = {
  isTouch: PropTypes.bool.isRequired,
  componentName: PropTypes.string.isRequired
};

export default connect(store => ({
  isTouch: isTouch(store)
}))(DynamicImport);
