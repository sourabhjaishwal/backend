## 🚀 Day 5 - Full-Stack Notes Application

Day 5 focuses on building a simple **full-stack Notes Application** using:

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Frontend:** React.js
- **API Communication:** Axios
- **Deployment:** Render

The application allows users to:

- Create notes
- View notes
- Update notes
- Delete notes

The project is divided into two parts:

- **Part 1:** Backend
- **Part 2:** Frontend

---

# Part 1 - Backend

### 📌 1. Backend Project Structure

The backend is responsible for:

- Creating the Express server
- Connecting to MongoDB
- Defining the Note schema and model
- Creating REST API endpoints
- Handling CRUD operations
- Serving static frontend files

```text
Backend/
├── node_modules/
├── public/
│   ├── assets/
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── note.model.js
│   └── app.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

### 📌 2. What is MongoDB?

**MongoDB** is a **NoSQL**, document-based database.

Unlike relational databases such as MySQL, MongoDB stores data as JSON-like documents internally represented using **BSON (Binary JSON)**.

MongoDB does not require a fixed table structure at the database level, which makes it flexible for storing different types of data.

Example document:

```json
{
  "title": "Learn MongoDB",
  "description": "MongoDB basics",
  "createdAt": "2026-02-05"
}
```

A MongoDB application generally organizes data like this:

```text
MongoDB
   │
   ▼
Database
   │
   ▼
Collection
   │
   ▼
Documents
```

### 📌 3. What is MongoDB Atlas?

**MongoDB Atlas** is a cloud-hosted MongoDB service.

It allows you to create and manage MongoDB databases in the cloud without managing the database server yourself.

Common features include:

- Free cluster options
- Automated backups on supported plans
- Security features
- Scaling options
- Multiple cloud providers and regions

Example MongoDB connection string:

```text
mongodb+srv://username:password@cluster0.mongodb.net/myDB
```

The connection string contains the information required by the application to connect to the MongoDB deployment.

### 📌 4. What is Mongoose?

**Mongoose** is an **ODM (Object Data Modeling)** library for MongoDB and Node.js.

It makes it easier to:

- Define schemas
- Create models
- Validate data
- Interact with MongoDB
- Perform CRUD operations

Install Mongoose:

```bash
npm install mongoose
```

### 📌 5. Connecting MongoDB with Mongoose

The database connection is stored in `src/config/database.js`.

```js
const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB.");
  });
}

module.exports = connectToDB;
```

The connection string is stored in an environment variable.

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/day-05
```

### 📌 6. What Does `require("dotenv").config()` Do?

In `server.js`, we use:

```js
require("dotenv").config();
```

This loads variables from the `.env` file into `process.env`.

For example, if `.env` contains:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/day-05
```

The application can access it using:

```js
process.env.MONGO_URI;
```

This allows sensitive configuration values such as database credentials to remain outside the source code.

### 📌 7. What is a Schema?

A **schema** defines the structure, data types, and rules for documents managed through a Mongoose model.

For the Notes application:

```js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});
```

This means a note contains:

- `title` → String
- `description` → String

A schema can also define validation rules and timestamps.

Example:

```js
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
```

`timestamps: true` automatically adds:

- `createdAt`
- `updatedAt`

### 📌 8. Common Mongoose Schema Types

Some commonly used Mongoose schema types are:

- `String`
- `Number`
- `Boolean`
- `Date`
- `Array`
- `ObjectId`

Example:

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isActive: Boolean,
  createdAt: Date,
  skills: Array,
});
```

### 📌 9. What is a Model?

A **model** is created from a Mongoose schema and is used to interact with MongoDB.

It provides methods for operations such as:

- Create
- Read
- Update
- Delete

Example:

```js
const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
```

The model acts as the main interface between the application and the MongoDB collection.

A Mongoose model is associated with a MongoDB collection. Mongoose normally derives the collection name from the model name by pluralizing and lowercasing it.

### 📌 10. What is a Collection?

A **collection** stores multiple documents of a similar type.

For this application:

```text
Database
   │
   ▼
notes Collection
   │
   ├── Note Document 1
   ├── Note Document 2
   └── Note Document 3
```

Each note is stored as a separate document.

### 📌 11. Backend Application Configuration

The `app.js` file is responsible for:

- Creating the Express application
- Configuring middleware
- Importing the Note model
- Creating REST API routes
- Serving static files

```js
const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
```

### 📌 12. What Does `app.use(express.json())` Do?

```js
app.use(express.json());
```

This enables Express to parse incoming requests containing JSON data.

For example, the frontend may send:

```json
{
  "title": "Learn Express",
  "description": "Learn Express.js basics"
}
```

After `express.json()` processes the request, the data can be accessed through:

```js
req.body;
```

Without this middleware, Express would not automatically parse JSON request bodies.

### 📌 13. What Does `const { title, description } = req.body` Do?

This line uses **object destructuring**:

```js
const { title, description } = req.body;
```

Suppose the request body is:

```json
{
  "title": "Learn MongoDB",
  "description": "Learn MongoDB basics"
}
```

The destructuring statement extracts the two properties into variables:

```js
title;
description;
```

It is equivalent to:

```js
const title = req.body.title;
const description = req.body.description;
```

### 📌 14. CORS Middleware

```js
app.use(cors());
```

**CORS (Cross-Origin Resource Sharing)** allows the frontend and backend to communicate when they are running on different origins.

For example:

```text
Frontend
https://frontend.example.com

        │
        │ HTTP Request
        ▼

Backend
https://backend.example.com
```

CORS allows the browser to make cross-origin requests when the server permits them.

### 📌 15. Serving Static Files

Express can serve static files such as:

- HTML
- CSS
- JavaScript
- Images
- Other frontend assets

```js
app.use(express.static("./public"));
```

This makes files inside the `public` directory available to clients.

### 📌 16. CREATE - Adding a New Note

The POST API creates a new note and saves it to MongoDB.

```js
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully.",
    note,
  });
});
```

### 📌 17. Understanding the Create Note API

Let's understand the API step by step.

**Step 1: Define the route**

```js
app.post("/api/notes", async (req, res) => {
```

This creates a POST endpoint at:

```text
POST /api/notes
```

The frontend sends this request when it wants to create a new note.

**Step 2: Read data from the request**

```js
const { title, description } = req.body;
```

The title and description are extracted from the JSON request body.

**Step 3: Create the database document**

```js
const note = await noteModel.create({
  title,
  description,
});
```

Mongoose creates a new note document and saves it to MongoDB.

**Step 4: Send the response**

```js
res.status(201).json({
  message: "Note created successfully.",
  note,
});
```

The server sends a JSON response with:

- HTTP status `201`
- A success message
- The newly created note

### 📌 18. CRUD Operations with Mongoose

CRUD stands for:

- **Create**
- **Read**
- **Update**
- **Delete**

These are the four basic operations performed on stored data.

### 📌 19. CREATE - `create()`

The `create()` method creates and saves a new document.

```js
const note = await Note.create({
  title: "MongoDB",
  description: "Learn CRUD",
});
```

Another approach is to create a document and then call `save()`:

```js
const note = new Note({
  title: "Node.js",
  description: "Backend basics",
});

await note.save();
```

### 📌 20. READ - Fetching Data

#### `find()` - Get Multiple Documents

```js
const notes = await Note.find();
```

`find()` returns an **array**.

If multiple documents are found, the result is an array of objects:

```js
[
  {
    _id: "1",
    title: "MongoDB",
    description: "Learn MongoDB",
  },
  {
    _id: "2",
    title: "Node.js",
    description: "Learn Backend",
  },
];
```

If no documents are found, `find()` returns an empty array:

```js
[];
```

#### `findOne()` - Get One Matching Document

```js
const note = await Note.findOne({
  title: "MongoDB",
});
```

This returns the first matching document.

#### `findById()` - Find by `_id`

```js
const note = await Note.findById("65c0a9b...");
```

This is useful when you already have the MongoDB document ID.

#### `find()` with a Condition

```js
const notes = await Note.find({
  title: "MongoDB",
});
```

This returns all documents matching the condition.

### 📌 21. READ - Getting All Notes from the API

The Notes application uses:

```js
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully.",
    notes,
  });
});
```

The `find()` method retrieves all notes.

The response contains the notes as an array:

```json
{
  "message": "Notes fetched successfully.",
  "notes": [
    {
      "_id": "1",
      "title": "Learn MongoDB",
      "description": "MongoDB basics"
    },
    {
      "_id": "2",
      "title": "Learn Express",
      "description": "Express basics"
    }
  ]
}
```

### 📌 22. UPDATE - Modifying Data

The `findByIdAndUpdate()` method updates a document using its ID.

```js
const updatedNote = await Note.findByIdAndUpdate(
  noteId,
  {
    title: "Updated Title",
  },
  {
    new: true,
  },
);
```

**Important Options**

- `new: true` → Returns the updated document.
- `runValidators: true` → Runs the schema validation rules during the update.

Example:

```js
const updatedNote = await Note.findByIdAndUpdate(
  noteId,
  {
    title: "Updated Title",
  },
  {
    new: true,
    runValidators: true,
  },
);
```

### 📌 23. UPDATE - Updating a Note Through the API

The Notes application uses a PATCH endpoint:

```js
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, {
    description,
  });

  res.status(200).json({
    message: "Note updated successfully.",
  });
});
```

The note ID is received from:

```js
req.params.id;
```

The new description is received from:

```js
req.body;
```

The database is updated using:

```js
noteModel.findByIdAndUpdate();
```

### 📌 24. DELETE - Removing Data

The `findByIdAndDelete()` method removes a document using its ID.

```js
await Note.findByIdAndDelete(noteId);
```

Other deletion methods include:

**`deleteOne()`**

```js
await Note.deleteOne({
  _id: noteId,
});
```

**`deleteMany()`**

```js
await Note.deleteMany({
  title: "Test",
});
```

### 📌 25. DELETE - Removing a Note Through the API

The Notes application uses:

```js
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully.",
    id,
  });
});
```

The note ID is received through:

```js
req.params.id;
```

The document is deleted using:

```js
noteModel.findByIdAndDelete(id);
```

### 📌 26. Complete CRUD API Flow

The Notes application follows this CRUD structure:

| Operation | HTTP Method | Endpoint         | Mongoose Method       |
| --------- | ----------- | ---------------- | --------------------- |
| Create    | POST        | `/api/notes`     | `create()`            |
| Read      | GET         | `/api/notes`     | `find()`              |
| Update    | PATCH       | `/api/notes/:id` | `findByIdAndUpdate()` |
| Delete    | DELETE      | `/api/notes/:id` | `findByIdAndDelete()` |

The complete flow is:

```text
Client
   │
   │ HTTP Request
   ▼
Express REST API
   │
   │ Mongoose
   ▼
MongoDB
   │
   │ Database Operation
   ▼
Response
   │
   ▼
Client
```

### 📌 27. Starting the Backend Server

The `server.js` file is responsible for:

- Loading environment variables
- Importing the Express application
- Connecting to MongoDB
- Starting the server

```js
require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
```

### 📌 28. Backend Startup Flow

When the backend starts:

```text
server.js
    │
    ├── Load .env variables
    │
    ├── Import app.js
    │
    ├── Import database connection
    │
    ├── Connect to MongoDB
    │
    └── Start Express Server
```

### 🎯 Part 1 Summary

- Learned what MongoDB is and how it stores documents.
- Learned about MongoDB Atlas and cloud-hosted databases.
- Used Mongoose as an ODM for MongoDB.
- Learned about schemas, models, collections, and documents.
- Learned common Mongoose schema types.
- Used `dotenv` to load environment variables.
- Used `express.json()` to parse JSON request bodies.
- Used object destructuring to extract data from `req.body`.
- Configured CORS for frontend-backend communication.
- Created REST APIs using Express.
- Implemented CRUD operations using Mongoose.
- Learned `create()`, `save()`, `find()`, `findOne()`, `findById()`, `findByIdAndUpdate()`, and deletion methods.
- Learned how the backend connects the React frontend to MongoDB.
- Understood the complete request and database flow.

---

# Part 2 - Frontend

### 📌 1. Frontend Project Structure

The frontend is built using **React.js** and **Vite**.

```text
Frontend/
├── dist/
│   ├── assets/
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── node_modules/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

### 📌 2. React Application Entry Point

The `main.jsx` file is the entry point of the React application.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### 📌 3. Understanding `createRoot()`

```jsx
createRoot(document.getElementById("root"));
```

This connects the React application to the HTML element with the ID `root`.

React then renders the `App` component inside that element.

### 📌 4. Understanding `StrictMode`

```jsx
<StrictMode>
  <App />
</StrictMode>
```

`StrictMode` is a React development feature that helps identify potential problems in the application.

It does not render any visible UI itself.

### 📌 5. Creating the Main App Component

The `App.jsx` file contains the main UI and application logic.

The application uses:

- `useState`
- `useEffect`
- Axios

### 📌 6. Managing Notes with `useState`

```jsx
const [notes, setNotes] = useState([]);
```

The `notes` state stores the notes received from the backend.

Initially, the state is:

```js
[];
```

After fetching data, it is updated using:

```js
setNotes(res.data.notes);
```

When the state changes, React re-renders the UI.

### 📌 7. Fetching Notes from the Backend

The `fetchNotes()` function sends a GET request to the backend:

```jsx
function fetchNotes() {
  axios.get("https://backend-day-05.onrender.com/api/notes").then((res) => {
    setNotes(res.data.notes);
  });
}
```

The process is:

```text
React Frontend
      │
      │ GET /api/notes
      ▼
Express Backend
      │
      ▼
MongoDB
      │
      ▼
Notes Data
      │
      ▼
React State
```

### 📌 8. Fetching Data When the App Loads

The `useEffect()` hook is used to fetch notes when the application loads.

```jsx
useEffect(() => {
  fetchNotes();
}, []);
```

The empty dependency array means the effect runs when the component is initially mounted.

### 📌 9. Creating a Note from the Frontend

The `handleSubmit()` function sends the form data to the backend.

```jsx
function handleSubmit(e) {
  e.preventDefault();

  const { title, description } = e.target.elements;

  axios
    .post("https://backend-day-05.onrender.com/api/notes", {
      title: title.value,
      description: description.value,
    })
    .then((res) => {
      console.log(res.data);
      fetchNotes();
    });
}
```

The function:

1. Prevents the browser's default form submission.
2. Gets the title and description fields.
3. Sends a POST request using Axios.
4. Sends the note data to the backend.
5. Fetches the updated notes list.

### 📌 10. Creating the Note Form

```jsx
<form className="note-create-form" onSubmit={handleSubmit}>
  <input name="title" type="text" placeholder="Enter your title" />

  <input name="description" type="text" placeholder="Enter your description" />

  <button>Add Note</button>
</form>
```

The `name` attributes allow the form fields to be accessed through:

```jsx
e.target.elements;
```

### 📌 11. Displaying Notes Using `map()`

The notes are displayed using JavaScript's `map()` method.

```jsx
<div className="notes">
  {notes.map((note) => {
    return (
      <div className="note">
        <h1>{note.title}</h1>
        <p>{note.description}</p>
      </div>
    );
  })}
</div>
```

For every note in the `notes` array, React creates a note card.

### 📌 12. Deleting a Note from the Frontend

The `handleDeleteNote()` function sends a DELETE request.

```jsx
function handleDeleteNote(noteId) {
  axios
    .delete("https://backend-day-05.onrender.com/api/notes/" + noteId)
    .then((res) => {
      console.log(res.data);
      fetchNotes();
    });
}
```

The note ID is sent to:

```text
DELETE /api/notes/:id
```

After deletion, `fetchNotes()` is called again to refresh the displayed notes.

### 📌 13. Delete Button

Each note has a Delete button:

```jsx
<button
  onClick={() => {
    handleDeleteNote(note._id);
  }}
>
  Delete
</button>
```

MongoDB automatically provides each document with a unique `_id`.

That ID is passed to:

```jsx
handleDeleteNote(note._id);
```

### 📌 14. Connecting Frontend and Backend

The frontend communicates with the backend using Axios.

The application follows this flow:

```text
React Frontend
      │
      ├── GET    → Fetch Notes
      ├── POST   → Create Note
      ├── PATCH  → Update Note
      └── DELETE → Delete Note
      │
      ▼
Express REST API
      │
      ▼
MongoDB
```

### 📌 15. Styling the Application

The `index.css` file contains the global styles.

The universal selector resets default browser spacing:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

The application uses:

- Dark background
- Flexible note layout
- Note cards
- Form inputs
- Add button
- Delete button

### 📌 16. Notes Layout

The notes container uses Flexbox:

```css
.notes {
  display: flex;
  gap: 1rem;
  padding-block: 1rem;
  padding-inline: 3rem;
  flex-wrap: wrap;
}
```

**Important Properties**

- `display: flex` → Enables Flexbox.
- `gap` → Adds spacing between note cards.
- `flex-wrap: wrap` → Moves notes to the next line when necessary.

### 📌 17. Complete Application Flow

The complete application works like this:

```text
User
 │
 ▼
React Frontend
 │
 │ Axios Request
 ▼
Express REST API
 │
 │ Mongoose
 ▼
MongoDB
 │
 │ Response
 ▼
Express Backend
 │
 ▼
React State
 │
 ▼
Updated UI
```

### 📌 18. Current CRUD Implementation

The backend implements all four CRUD operations:

- **Create** → Implemented in backend and frontend
- **Read** → Implemented in backend and frontend
- **Update** → Backend API implemented, frontend UI not yet implemented
- **Delete** → Implemented in backend and frontend

The current frontend does not yet contain an Edit button or an update function.

### 🎯 Part 2 Summary

- Created a React frontend using Vite.
- Used `createRoot()` to render the React application.
- Used `StrictMode` during development.
- Managed notes using React `useState`.
- Used `useEffect` to fetch notes when the application loads.
- Used Axios to communicate with the backend API.
- Created notes using POST requests.
- Fetched notes using GET requests.
- Deleted notes using DELETE requests.
- Displayed notes using the `map()` method.
- Used MongoDB's `_id` to identify individual notes.
- Styled the application using CSS and Flexbox.
- Connected the React frontend with the Express backend.

### 🎯 Day 5 Summary

- Built a complete full-stack Notes Application.
- Created a REST API using Express.js.
- Connected the backend to MongoDB using Mongoose.
- Learned the difference between schemas, models, collections, and documents.
- Learned Mongoose CRUD methods.
- Implemented Create, Read, Update, and Delete operations in the backend.
- Used environment variables for database configuration.
- Added CORS support for frontend-backend communication.
- Built a React frontend using Vite.
- Used Axios for API communication.
- Used React hooks to manage application state and API calls.
- Connected the frontend, backend, and database into one full-stack application.
