import React, { useRef } from "react";
import "./TodoItem.css";

export default function TodoItem({ title, description }) {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  function borderRefresh(ref) {
    let text = ref.current.value;

    if (text !== "") {
      ref.current.style.border = "0px";
    } else {
      ref.current.style.border = "2px solid rgba(175, 175, 175, 0.4)";
    }
  }

  return (
    <div className="todoItem">
      <div className="closeButton">X</div>
      <input
        ref={titleRef}
        onChange={() => {
          borderRefresh(titleRef);
        }}
        default={title}
        className="todoItemField todoItemTitle"
        placeholder="Title"
        type="text"
      ></input>
      <textarea
        ref={descriptionRef}
        onChange={() => {
          borderRefresh(descriptionRef);
        }}
        default={description}
        className="todoItemField todoItemDescription"
        placeholder="Description"
        type="textField"
      ></textarea>
    </div>
  );
}
