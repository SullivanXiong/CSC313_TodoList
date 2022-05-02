const express = require("express");
const app = express();
const port = 3001;

const pool = "SQL CONNECTION";

app.get("/default/to_do_list", (req, res) => {
  items = pool.query("SELECT * FROM items");
  res.send();
});

app.delete("/default/to_do_list/:delete", (req, res) => {
  let title = req.params.delete;
  pool.query(`DELETE FROM items where title="${title}"`);
  res.send("Hello World!");
});

app.post("/default/to_do_list/:title", (req, res) => {
  let title = req.params.title;
  let description = req.params.body;
  pool.query(
    `INSERT INTO items (title, description) VALUES (${title}, ${description}) ON DUPLICATE KEY UPDATE description="${description}"`
  );
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
