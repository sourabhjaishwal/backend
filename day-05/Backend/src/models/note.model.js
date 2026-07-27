const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;

/*
* - A schema defines the structure and format in which data is stored in the database. Here, we are creating a schema for the Notes application.

* - A model is used to interact with the database. It provides methods to perform CRUD (Create, Read, Update, Delete) operations on notes.

* - Data with the same structure is stored together in a collection. A collection holds multiple documents of the same type.
*/
