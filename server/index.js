const express = require("express")
const { resolve } = require("path")

const app = express()

app.use(express.static(resolve(__dirname, "../client")))

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "../client/index.html"));
});

app.listen(8080)
