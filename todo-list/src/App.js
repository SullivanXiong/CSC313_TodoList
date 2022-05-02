import "./App.css";
import { getItems } from "./Todo/todoUtility.js";
import { useState, useEffect } from "react";
import TodoItem from "./Todo/TodoItem.js";
import TodoAdd from "./Todo/TodoAdd.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    async function init() {
      let items = (await getItems())["Items"];
      setTodoItems(items);
    }
    init();
  }, []);

  return (
    <>
      <div className="App">
        <div className="todoItemContainer">
          {todoItems.map((item) => (
            <TodoItem
              title={item.title}
              description={item.data.description.slice(1).slice(0, -1)}
              setTodoItems={setTodoItems}
            ></TodoItem>
          ))}
          <TodoAdd setTodoItems={setTodoItems}></TodoAdd>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
