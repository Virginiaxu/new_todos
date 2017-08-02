import React from "react";
import superagent from "superagent";
import PropTypes from "prop-types";

class TodoForm extends React.Component {

  static propTypes = {
    updateTodoList: PropTypes.func.isRequired,
  };

  handleSubmit(event) {
    event.preventDefault();
    
    const todo = { text: this.refs.text.value, done: false };
    superagent.post('/api/todos')
      .send(todo)
      .end((err, res) => {
        if (err) return console.error(err);
        this.refs.text.value = '';
        this.props.updateTodoList(res.body);
      });
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2 text-center">
          <form>
             <div className="form-group">
                <input type="text" className="form-control input-lg text-center" ref="text"
                autoFocus placeholder="text..."/>
              </div>
              <button type="submit" className="btn btn-primary btn-lg"
               onClick={this.handleSubmit.bind(this)}>Add</button>
          </form>
         </div>
      </div>
    );
  }
}

export default TodoForm;