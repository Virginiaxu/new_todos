import React from "react";
import PropTypes from "prop-types";

class TodoItem extends React.Component {

    state = {
		isEditing: false
    };

    static propTypes = {
        text: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        handleClick: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        handleDelete: PropTypes.func.isRequired,
        handleUpdate: PropTypes.func.isRequired
    };

    renderTaskSection() {
        const { text, done, handleClick, index, handleDelete } = this.props;
 		if (this.state.isEditing){
 			return (
 				<div>
 					<form onSubmit={this.onSaveClick.bind(this)}>
 						<input type="text" defaultValue={text} ref="editInput" />
 					</form>
 				</div>
 			);
 		}
 		return (
            <div>
                <label>
                    <input type="checkbox" checked={done} onChange={() => handleClick(index)}/>
                    {done ? (<del>{text}</del>) : text}
                </label>
          </div>		
 		); 	
     }
    
	renderActionsSection() {   
		if(this.state.isEditing){
			return (
				<div>
					<button onClick = {this.onSaveClick.bind(this)}>Save</button>
					<button onClick = {this.onCancelClick.bind(this)}>Cancel</button>
				</div>
                
			);
		}	
		return (
			<div>
				<button onClick = {this.onEditClick.bind(this)}>Edit</button>
				<button onClick = {this.props.handleDelete.bind(this,this.props.index)}>Delete</button>
			</div>

		);
	}

    render(){
		return (		
			<div className="text-center">
				{this.renderTaskSection()}
				{this.renderActionsSection()}
			</div>
		);
	}

	onEditClick() {
		this.setState({ isEditing: true });
	}

	onCancelClick() {
		this.setState({ isEditing: false });
	}

	onSaveClick(event) {
		event.preventDefault();
		const index = this.props.index;
		const text = this.refs.editInput.value;
		this.props.handleUpdate(index, text);
		this.setState({ isEditing: false })

	}
}

export default TodoItem;
  

