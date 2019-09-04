import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Column.scss";

export default class Column extends Component {
  render() {
    const { id, name, children, onDrop, onDragOver, onAdd } = this.props;

    return (
      <div
        id={id}
        name={name}
        className="Column"
        onDrop={onDrop}
        onClick={onDrop}
        onDragOver={onDragOver}
      >
        <header>
          <h2>{name}</h2>
          {onAdd && <i className="plus" onClick={onAdd} />}
        </header>
        {children}
      </div>
    );
  }
}

Column.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shouldHaveAddIcon: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onAdd: PropTypes.func
};
