import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import thunk from "redux-thunk";
import PropTypes from "prop-types";

class FakeReduxProvider extends Component {
  constructor(props) {
    super(props);

    const fakeReducer = props.reducer || (s => s);

    const thunkMiddleware = props.mockApi
      ? thunk.withExtraArgument(props.mockApi)
      : thunk;
    this.store = createStore(
      fakeReducer,
      props.initialState,
      applyMiddleware(thunkMiddleware)
    );
  }

  render() {
    return (
      <ReduxProvider store={this.store}>{this.props.children}</ReduxProvider>
    );
  }
}

FakeReduxProvider.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.object,
  mockApi: PropTypes.object,
  reducer: PropTypes.func
};

export default FakeReduxProvider;
