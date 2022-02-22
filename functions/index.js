const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require("express");
const { readFile } = require("fs").promises;
const app = express();

admin.initializeApp();

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
            data["documentID"] = doc.id;
            console.log(data);
            response.send(data);
        })
    });
});

app.post("/like-project", async (request, response) => {
    const increment = admin.firestore.FieldValue.increment(1);

    const collection = admin.firestore().collection("projects");
    const project = collection.doc(request.body.documentID);

    project.update({ "likes": increment });
});

// Default Express configuration.
//app.listen(3000, () => console.log("App available on http://localhost:3000"));

// Firebase Functions configuration.
const webApi = functions.https.onRequest(app);
module.exports = { webApi }