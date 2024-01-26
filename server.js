//dependencies
const express = require("express");
const path = require('path');

//app use express
const app = express();

const uuid = require("./helpers/uuid");

const { readFromFile, readAndAppend, readAndRemove } = require("./helpers/fsUtils");

const PORT = process.env.PORT || 3001;

//asks Express to create a route for every file in the 'public' folder and give it a '/' route
app.use(express.static("public"));
//sets up Express app to handel data parser, middleware created req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for tips`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received for tips`);
    const { title, text } = req.body;
      if (req.body) {
    const newNotes = {
      title,text,
      id: uuid(),
    };

    readAndAppend(newNotes, './db/db.json');
    res.json('Note was added!')
  }
  else {
    res.status(500).json('Error was made in tips.');
  }

});




//app listener
app.listen(PORT, () => {
  console.log(`Express server listening at ${PORT} `);
});
