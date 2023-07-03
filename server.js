const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const { authenticate } = require("./middlewares");
const { post } = require("./endpoints");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const postHandlers = post({ axios });

app.post("/", authenticate, postHandlers.post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
