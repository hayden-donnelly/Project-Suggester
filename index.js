const express = require("express");
const { readFile } = require("fs");
const app = express();

app.get("/", (request, response) => {
    readFile("./template.html", "utf8", (error, html) => {

        if(error) {
            response.status(500).send("Couldn't fetch file.");
        }

        response.send(html);
    })
});

app.listen(3000, () => console.log("App available on http://localhost:3000"));