import { useDispatch } from "react-redux";
import { getTodos, postTodos } from "./api";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function Todo() {
  const dispatch = useDispatch();

  const handleAdd = (text) => {
    dispatch(postTodos(text))
    .then(res => {
      dispatch(getTodos());
    });
  }

  return (
    <div>
      <TodoInput onAdd={handleAdd}/>
      <TodoList/>
    </div>
  );
}
