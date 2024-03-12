import express from "express";
import data from "./data.js";
import bodyParser from "body-parser";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(bodyParser.json());

app.get("/items", (req, res) => {
  res.send(data);
});

app.post("/items", (req, res) => {
  const newItem = {
    id: Date.now(),
    name: req.body.name,
  };
  data.push(newItem);
  res.send(newItem);
});

app.put("/items/:id", (req, res) => {
  const item = data.find((i) => i.id === parseInt(req.params.id));

  if (!item) {
    res.status(404).send("Item not found");
  } else {
    item.name = req.body.name;
    res.send(item);
  }
});

app.delete("items/:id", (req, res) => {
  const item = data.find((i) => i.id === parseInt(req.params.id));

  if (!item) {
    res.status(404).send("Item not found");
  } else {
    const index = data.indexOf(item);
    data.splice(index, 1);
    res.send(item);
  }
});
