const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require("express");
const { readFile } = require("fs").promises;
const app = express();

admin.initializeApp();

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

    let random = Math.random() * 3;
    const collection = admin.firestore().collection("projects");
    // TODO: fix projects.size
    /*collection.get().then(projects => {
        random = Math.floor(Math.random() * projects.size);
    });*/

    const query = collection.where("id", ">=", random).limit(1);

    query.get().then(project => {
        project.forEach(doc => {
            data = doc.data();
            console.log(data);
            response.send(data);
        })
    });

    //const result = await admin.firestore().collection("projects").where("id", "==", 1).get();
    //console.log(result);

    //response.send(newProject);
});

// Default Express configuration.
//app.listen(3000, () => console.log("App available on http://localhost:3000"));

// Firebase Functions configuration.
const webApi = functions.https.onRequest(app);
module.exports = { webApi }