import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getTodosFailure, getTodosRequest, getTodosSuccess, removeTodoItem, toggleTodooItem } from "../Redux/app/action";
import { getTodos } from "./api";

function TodoItem({ title, status, id, getTodos }) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    console.log("delete clicked");

    const config = {
      method: 'DELETE'
    }
    await fetch(`https://todo-task-mock-server.herokuapp.com/todos/${id}`, config);
    dispatch(getTodos());

  };

  const handleToggle = async (id, status) => {
    const action = toggleTodooItem({
      id,
      status
    });

    dispatch(action);
    // const config = {
    //   method: 'PATCH',
    //   body: {}
    // }
  };
  return (
    <div style={{ display: "flex", padding: "1rem", justifyContent: "center" }}>
      <div style={{ marginRight: "1rem" }}>{title}</div>
      <div style={{ marginRight: "1rem" }}>{`${status}`}</div>
      <button
        onClick={() => handleToggle(id, status)}
        style={{ marginRight: "1rem" }}
      >
        Toggle
      </button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
}

export default function TodoList() {
  const {todos, isLoading, isError} = useSelector((state) => state.app, shallowEqual);

  const dispatch = useDispatch();

  useEffect( () => {
    // getTodos(dispatch)
    dispatch(getTodos());
  }, [])

  return (
    <div>
      {isLoading && <h3>Loading....</h3>}
      {isError && <h3>Something's wrong!</h3>}
      {todos.map((item) => (
        <TodoItem key={item.id} {...item} getTodos={getTodos}/>
      ))}
    </div>
  );
}
