import "./App.css";
import { useState } from "react";
import TodoItem from "./Todo/TodoItem.js";
import TodoAdd from "./Todo/TodoAdd.js";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  return (
    <div className="App">
      <div className="todoItemContainer">
        {todoItems.map((item) => (
          <TodoItem title={item.title} description={item.description}></TodoItem>
        ))}
        <TodoAdd setTodoItems={setTodoItems}></TodoAdd>
      </div>
    </div>
  );
}

export default App;
