import React from "react";
import PropTypes from "prop-types";

class Header extends React.Component {
  static propTypes = {
    todoList: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="jumbotron text-center">
        <h1>Todos List</h1>
      </div>
    );
  }
}

export default Header;