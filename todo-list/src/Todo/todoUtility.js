import { toast } from "react-toastify";

const API_INVOKE_BASE_URL = "https://yaa6qqcz3a.execute-api.us-west-2.amazonaws.com/default/todo_list"
export async function createNewItem(title, body) {
  try {
    await fetch(`${API_INVOKE_BASE_URL}?title=${title}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
  } catch (e) {
    toast.error(`ERROR: ${e}`);
  }
}

export async function getItems() {
  try {
    let items = await (
      await fetch(`${API_INVOKE_BASE_URL}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    toast.success("Got items");

    return items;
  } catch (e) {
    toast.error(`ERROR: ${e}`);
  }
}
