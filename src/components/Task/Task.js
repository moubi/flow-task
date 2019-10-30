import React, { Component } from "react";
import DynamicImport from "../DynamicImport/DynamicImport";

export default class Task extends Component {
  render() {
    return <DynamicImport componentName="Task" {...this.props} />;
  }
}
