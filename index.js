const express = require("express");
const { readFile } = require("fs").promises;
const app = express();

app.get("/", async (request, response) => {
    response.send(await readFile("./template.html", "utf8"));
});

app.listen(3000, () => console.log("App available on http://localhost:3000"));