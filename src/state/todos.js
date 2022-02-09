export function loadTodos() {
  return dispatch => {
    // for the sake of this exercise data is being returned directly - real implementation would use API
    // timeout added for realism of latency
    dispatch({type: "LOADING"});
    setTimeout(() => {
      dispatch({
        type: "LIST_TODOS",
        payload: ["todo one", "todo two"]
      });
    }, 2000);
  };
}

export function addTodo(todo) {
  // imagine that adding a todo is also an async operation
  return dispatch => {
    dispatch({type: "LOADING"});
    setTimeout(() => {
      dispatch({type: 'ADD_TODO', payload: todo})
    }, 2000);
  };
}

const initialState = {
  list: [],
  loading: true
}
export function todos(state= initialState, action) {
  switch (action.type) {
    case "LOADING":
      return {...state, list: [...state.list], loading: true}
    case "ADD_TODO":
      return { ...state, list: [...state.list, action.payload], loading: false };
    case "LIST_TODOS":
      return { ...state, list: action.payload,  loading: false};
    default:
      return state;
  }
}
