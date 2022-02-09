import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./TodoList.css";
import { addTodo, loadTodos } from "./state/todos";

class TodoListBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: ''
        };
    }

   componentWillMount() {
        this.props.loadTodos()
  }


  render() {
    return (
      <div className="container mt-3 p-5">
        <div className="header">
          <h1>My Todo List</h1>
          <input placeholder="Todo" data-testid="todo"  value={this.state.name} disabled={this.props.loading}
                 onChange={(e) => this.onTodoEntered(e.target.value)} />
          <button className="btn addBtn" onClick={() => this.onAddTodo()}
                  disabled={this.props.loading}>
              {this.props.loading &&
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
              }
              Add Todo </button>
            {this.state.error !== ''  && <div className="error"> <span>{this.state.error}</span> </div> }
        </div>
        <div>
          <ol className="todoList">
            {this.props.todos.map((todo, index) => (
              <li key={index} data-testid={`todo-${index}`}>{todo}</li>
            ))}
          </ol>
        </div>
          {this.props.loading &&
              <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
          }
      </div>
    );
  }

  clearTodoField = () => {
      this.setState({name: ''});
  }

  onTodoEntered = (value) => {
    this.setState({name: value, error: ''});
  }

  onAddTodo = () => {
      let errorVal = ''
      if (this.state.name  === '') {
          errorVal = 'Todo cannot be blank'
      }
      this.setState({name: this.state.name, error: errorVal });
      if (errorVal === '') {
          this.props.addTodo(this.state.name);
          this.clearTodoField()
      }
  }
}

const mapStateToProps = state => ({
  todos: state.list,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  loadTodos: bindActionCreators(loadTodos, dispatch),
  addTodo: (todo) => dispatch(addTodo(todo))
});

export const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListBase);
