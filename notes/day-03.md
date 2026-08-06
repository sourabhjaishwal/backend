## 🚀 Day 3 - CRUD Operations with Express

### 📌 1. Project Structure

This project is divided into two files:

- **`server.js`** → Starts the server.
- **`app.js`** → Creates and configures the Express application.

### 📌 2. Server Creation and Configuration

The `app.js` file is responsible for:

- Creating the Express server
- Configuring middleware
- Defining API routes

```js
const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

module.exports = app;
```

**Explanation**

- `express()` creates an Express application.
- `express.json()` parses incoming JSON data from requests.
- `notes` is an in-memory array used to store notes.
- `module.exports` exports the application so it can be used in `server.js`.

### 📌 3. Starting the Server

The `server.js` file imports the Express application and starts the server.

```js
const app = require("./src/app.js");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

### 📌 4. Creating a Basic Route

```js
app.get("/", (req, res) => {
  res.send("Hello World!");
});
```

When a user visits:

```text
http://localhost:3000
```

the server responds with:

```text
Hello World!
```

### 📌 5. Creating a Note (POST)

The **POST** method is used to create new data.

```js
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.send("Note created successfully.");
});
```

**Example Request Body**

```json
{
  "title": "React",
  "description": "Learn React Basics"
}
```

### 📌 6. Reading Notes (GET)

The **GET** method retrieves data from the server.

```js
app.get("/notes", (req, res) => {
  res.send(notes);
});
```

This returns all notes stored in the array.

### 📌 7. Deleting a Note (DELETE)

The **DELETE** method removes a resource.

```js
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.send("Note deleted successfully.");
});
```

**Example**

```text
DELETE /notes/2
```

Here, `2` is a **route parameter**, accessed using:

```js
req.params.index;
```

**Note**

Using JavaScript's `delete` operator removes the value but leaves an empty slot in the array. The array length remains the same.

### 📌 8. Updating a Note (PATCH)

The **PATCH** method updates specific fields of an existing resource.

```js
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].title = req.body.title;
  notes[req.params.index].description = req.body.description;

  res.send("Note updated successfully.");
});
```

**Example Request Body**

```json
{
  "title": "Updated React",
  "description": "Updated description"
}
```

### 📌 9. Understanding `req.body` and `req.params`

#### **`req.body`**

Used to receive data sent inside the request body.

Example:

```json
{
  "title": "Node.js",
  "description": "Backend Runtime"
}
```

#### **`req.params`**

Used to receive dynamic values from the URL.

Example:

```text
DELETE /notes/3
```

```js
req.params.index;
```

returns:

```text
3
```

### 📌 10. Understanding REST APIs

**REST (Representational State Transfer)** is an architectural style used to build web APIs.

REST APIs communicate over HTTP and treat everything as a **resource**, such as:

- Users
- Products
- Notes
- Orders

### 📌 11. Key REST Concepts

- **Resources** – Objects exposed through the API.
- **URI (Uniform Resource Identifier)** – The unique address of a resource.
- **Representations** – Resources are exchanged as JSON or XML.
- **Stateless Communication** – Every request contains all the required information.
- **HTTP Methods** – Used to perform CRUD operations.
- **HTTP Status Codes** – Indicate whether a request succeeded or failed.

### 📌 12. HTTP Methods

| Method | Purpose                      | Idempotent |
| ------ | ---------------------------- | ---------- |
| GET    | Retrieve data                | Yes        |
| POST   | Create new data              | No         |
| PUT    | Replace an existing resource | Yes        |
| PATCH  | Partially update a resource  | Yes        |
| DELETE | Remove a resource            | Yes        |

### 📌 13. Important Concepts

**Idempotent Methods**

Calling these methods multiple times with the same request produces the same result.

Examples:

- GET
- PUT
- PATCH
- DELETE

**Non-Idempotent Method**

- POST creates a new resource every time it is called.

**Safe Methods**

Safe methods do not modify server data.

Examples:

- GET
- HEAD
- OPTIONS

### 📌 14. Testing APIs

After creating each API endpoint, test it using **Postman** to verify that it works as expected.

### 🎯 Day 3 Summary

- Created an Express application and configured middleware.
- Started the server using `server.js`.
- Implemented CRUD operations using GET, POST, PATCH, and DELETE.
- Learned the difference between `req.body` and `req.params`.
- Understood REST architecture and its key concepts.
- Learned the purpose of different HTTP methods.
- Explored idempotent and safe HTTP methods.
- Tested API endpoints using Postman.

---
