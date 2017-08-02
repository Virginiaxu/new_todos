import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

class TodoList extends React.Component {

  static propTypes = {
    todoList: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  };

  render() {
    const todoList = this.props.todoList;
    const { handleClick, handleDelete, handleUpdate} = this.props;
    return (
      <div id="todo-list" className="row">
        <div className="col-sm-4 col-sm-offset-4">
          {todoList.map((todo, index) => 
            <TodoItem key={index} 
                      index={index}
                      handleClick={handleClick} 
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete} 
                      {...todo} />)}
        </div>
      </div>
    );
  }
}

export default TodoList;