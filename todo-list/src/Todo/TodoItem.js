import React, { useRef } from "react";
import { toast } from "react-toastify";
import "./TodoItem.css";
import { createNewItem, getItems } from "./todoUtility";


const API_INVOKE_BASE_URL = "https://yaa6qqcz3a.execute-api.us-west-2.amazonaws.com/default/todo_list"

export default function TodoItem({ title, description, setTodoItems }) {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  let prevTitle = title ? title : "";
  let prevDescription = description ? description : "";

  function borderRefresh(ref) {
    let text = ref.current.value;

    if (text !== "") {
      ref.current.style.border = "0px";
    } else {
      ref.current.style.border = "2px solid rgba(175, 175, 175, 0.4)";
    }
  }

  async function updateItem() {
    let _title = titleRef.current.value;
    let _description = descriptionRef.current.value;

    if (_title !== prevTitle) {
      await fetch(`${API_INVOKE_BASE_URL}?delete=${prevTitle}`, {
        method: "DELETE",
      });

      await createNewItem(_title, _description);
      prevTitle = _title;
    } else if (_description !== prevDescription) {
      prevDescription = _description;
      await createNewItem(_title, _description);
    }

    toast.success("Updated Item");
  }

  return (
    <div className="todoItem">
      <div
        className="closeButton"
        onClick={async () => {
          await fetch(
            `${API_INVOKE_BASE_URL}?delete=${titleRef.current.value}`,
            {
              method: "DELETE",
            }
          );

          let items = (await getItems())["Items"];
          setTodoItems(items);
        }}
      >
        X
      </div>
      <input
        ref={titleRef}
        onChange={() => {
          borderRefresh(titleRef);
        }}
        onBlur={() => {
          updateItem();
        }}
        defaultValue={title}
        className="todoItemField todoItemTitle"
        placeholder="Title"
        type="text"
      ></input>
      <textarea
        ref={descriptionRef}
        onChange={() => {
          borderRefresh(descriptionRef);
        }}
        onBlur={() => {
          updateItem();
        }}
        defaultValue={description}
        className="todoItemField todoItemDescription"
        placeholder="Description"
        type="textField"
      ></textarea>
    </div>
  );
}
