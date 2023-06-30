const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const { users } = require("./endpoints");
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

const usersHandlers = users({ axios });

app.get("/", usersHandlers.get);

app.post("/", usersHandlers.post);

app.put("/:id", usersHandlers.put);

app.delete("/:id", usersHandlers.delete);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
