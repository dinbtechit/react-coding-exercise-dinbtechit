import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./App.css";
import { TodoList } from "./TodoList";
import { todos } from "./state/todos";

export const store = createStore(todos, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
