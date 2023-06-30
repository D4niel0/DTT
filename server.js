const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
// const parser = require("body-parser");

// app.use(parser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// parse application/json
// app.use(parser.json());

// app.use(function (req, res) {
//   res.setHeader("Content-Type", "text/plain");
//   res.write("you posted:\n");
//   res.end(JSON.stringify(req.body, null, 2));
// });

app.get("/", async (req, res) => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  console.log("test");
  res.sendStatus(200).send(data);
});

app.post("/", async (req, res) => {
  const { body } = req;
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    body
  );
  res.sendStatus(201).send(data);
});

app.put("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
  res.sendStatus(204);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
