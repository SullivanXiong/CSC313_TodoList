import { toast } from "react-toastify";

export async function createNewItem(title, body) {
  try {
    await fetch(`https://pbzc8wto7k.execute-api.us-west-2.amazonaws.com/default/to_do_list?title=${title}`, {
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
      await fetch("https://pbzc8wto7k.execute-api.us-west-2.amazonaws.com/default/to_do_list", {
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
