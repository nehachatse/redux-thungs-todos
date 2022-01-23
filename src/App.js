import Todo from "./Components/Todo";
import "./styles.css";
import Login from "./Components/Login/Login";
import { useSelector } from "react-redux";

export default function App() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const token = useSelector(state => state.auth.token);
  
  return isAuth ? (   
      <div className="App"> 
        <Todo />
      </div>
  ) : (<Login/>)
}
