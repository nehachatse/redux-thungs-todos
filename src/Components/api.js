import { addTodosFailure, addTodosRequest, addTodosSuccess, getTodosFailure, getTodosRequest, getTodosSuccess } from "../Redux/app/action";
import { v4 as uuid } from "uuid";

export const getTodos = () => (dispatch) => {
    const reqAction = getTodosRequest();
    dispatch(reqAction);

    return fetch("https://todo-task-mock-server.herokuapp.com/todos")
            .then(res => res.json())
            .then(res => {
              dispatch(getTodosSuccess(res));
            })
            .catch(err => {
              dispatch(getTodosFailure())
            })
  }

  export const postTodos = (text) => (dispatch) => {
    const data = {
        title: text,
        status: false,
        id: uuid()
      }

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    console.log("post", config.body)

    dispatch(addTodosRequest());

    return fetch("https://todo-task-mock-server.herokuapp.com/todos", config)
    .then(res => res.json())
    .then(res => {
      dispatch(addTodosSuccess(res));
    })
    .catch(err => {
      dispatch(addTodosFailure())
    })
    
    

  };