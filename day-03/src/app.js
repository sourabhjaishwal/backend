/*
Two main points of this app.js file:
1. Server creation
2. Server configuration
*/

const express = require("express");

const app = express(); // Server is created

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
  res.send("hello world!");
});

// POST /notes
app.post("/notes", (req, res) => {
  console.log(req.body);

  notes.push(req.body);

  console.log(notes);

  res.send("note created successfully.");
});

// GET /notes
app.get("/notes", (req, res) => {
  res.send(notes);
});

// DELETE /notes
/* params */
// delete /notes/2 (dynamic value)
app.delete("/notes/:index", (req, res) => {
  console.log(req.params.index);

  delete notes[req.params.index];

  res.send("note deleted successfully.");
});

// Note
/*
1. if value is single - we use index --- (req.body)
2. if value is big data - we use body --- (req.params.index)
*/

/*
- Example: here if we check and delete any note using index number then we will get as null in postman
- In backend there is nothing that we delete, instead we just replace the data with null, it doesn't get deleted or removed or vanishes completely.
*/

// PATCH /notes
/*
- /notes/:index
- req.body = {description: "sample modified description."}
*/
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].title = req.body.title;
  notes[req.params.index].description = req.body.description;

  res.send("note updated successfully.");
});

module.exports = app;
