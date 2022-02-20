const functions = require("firebase-functions");
const express = require("express");
const { readFile } = require("fs").promises;
const app = express();

const newProject = {
    "title": "Some Project",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore magni, facilis.",
    "tags": ["backend", "javascript", "data visualization"],
}

app.get("/", async (request, response) => {
    response.send(await readFile("./template.html", "utf8"));
});

app.get("/new-project", async (request, response) => {
    console.log("NEW PROJECT REQUEST");
    response.send(newProject);
});

app.listen(3000, () => console.log("App available on http://localhost:3000"));