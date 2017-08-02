import React from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import superagent from "superagent";

class App extends React.Component {
 state = { 
     todoList:[]
 };

  componentDidMount() {
    superagent.get('/api/todos')
      .end((err, res) => {
        if (err) return console.error(err);
        this.setState({
          todoList: res.body,
        });
        console.log(res.body);
      });
  }

  updateTodoList(todoList) {
    this.setState({ todoList });
  }

  handleClick(index) {
    const todoList = this.state.todoList;
    if (index < 0 || index > todoList.length) {
      console.error('index out of bounds');
    } else {
      todoList[index].done = !todoList[index].done;
      this.setState({ todoList });
      superagent.put('/api/todos')
        .send(todoList[index])
        .end((err, res) => {
          if (err) return console.error(err);
          console.log(res.body);
        });
    }
  }

  handleDelete(index) {
    console.log(index);
    const todoList = this.state.todoList;
    if (index < 0 || index > todoList.length) {
      console.error('index out of bounds');
    } else {
      const todo = todoList[index];
      superagent.del(`/api/todos/${todo._id}`)
        .end((err, res) => {
          if (err) console.error(err);
          this.setState({ todoList: res.body });
          console.log(res.body);
        });
    }
  }

  handleUpdate(index, text) {
    const todoList = this.state.todoList;
    if (index < 0 || index > todoList.length) {
      console.error('index out of bounds');
    } else {
      todoList[index].text = text;
      this.setState({ todoList });
      superagent.put('/api/todos')
        .send(todoList[index])
        .end((err, res) => {
          if (err) return console.error(err);
          console.log(res.body);
        });
    }
  }
 

  render() {
    const todoList = this.state.todoList;
    return (
      <div>
        <Header todoList={todoList}/>
       
        <TodoList {...this.state} 
        handleClick={this.handleClick.bind(this)}
        handleUpdate={this.handleUpdate.bind(this)}
        handleDelete={this.handleDelete.bind(this)}/>

        <TodoForm updateTodoList={this.updateTodoList.bind(this)}/>
      </div>
    );
  }
}

export default App;