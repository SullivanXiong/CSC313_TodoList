import React from "react";
import "./TodoAdd.css";

export default function TodoAdd({ setTodoItems }) {
  return (
    <div className="todoAdd">
      <div
        onClick={() => {
          setTodoItems((oldItems) => [...oldItems, { title: "", description: "" }]);
        }}
        className="todoAddButton"
      >
        +
      </div>
    </div>
  );
}
