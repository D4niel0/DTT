const express = require("express");
const app = express();
const port = 3000;
const { authenticate } = require("./middlewares");
const { post } = require("./endpoints");
const services = require("./services");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const postHandlers = post({ services });

app.post("/", authenticate, postHandlers.post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
