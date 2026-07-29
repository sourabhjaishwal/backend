# Backend Notes

This is a learning repository for understanding backend concepts from zero.

## 📚 Table of Contents

- Day 1 - Node.js Basics, NPM, and Express
- Day 2 - REST API & Express Routing
- Day 3 - CRUD Operations using Express
- Day 4 - HTTP Status Codes, REST API Best Practices & Introduction to MongoDB

---

## 🚀 Day 1 - Introduction to Node.js, NPM, and Express

### 📌 1. Running JavaScript Outside the Browser

**Install Node.js**

- Download and install Node.js from the official website.

**Create a file**

Create a file called `index.js`

```js
console.log("Hello World");
```

**Run the file**

```bash
node index.js
```

You can also write loops:

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### 📌 2. What is NPM?

- **NPM (Node Package Manager)** comes with Node.js.
- It is used to install reusable code packages created by other developers.

**What is a package?**

A package is a ready-made piece of code you can use in your project.

### 📌 3. Installing a Package

Example package: `cat-me`

```bash
npm install cat-me
```

This creates:

- `node_modules/` → stores installed packages
- `package.json` → project details + dependencies
- `package-lock.json` → locks exact versions

### 📌 4. Using a Package

Create `app.js`:

```js
const catMe = require("cat-me");

console.log(catMe());
```

Run it:

```bash
node app.js
```

### 📌 5. Important Files

**node_modules:** Stores all installed dependencies.

**package.json**
Contains:

- Project info
- Dependencies
- Scripts

**package-lock.json**
Locks exact versions to avoid errors across systems.

### 📌 6. What is a Server?

**A server is a program that:**

- Listens for requests
- Sends responses

### 📌 7. Creating a Basic Express Server

**Install Express**

```bash
npm install express
```

**Create `app.js`**

```js
const express = require("express");

const app = express();

app.listen(3000);
```

**Run server**

```bash
node app.js
```

**Open in browser:**

```
http://localhost:3000
```

### 🎯 Day 1 Summary

- Installed Node.js
- Ran JavaScript using Node
- Learned about NPM and packages
- Installed and used a package (`cat-me`)
- Understood Node project files
- Created a basic Express server

---

## 🚀 Day 2 - REST API & Express Routing

### 📌 1. What is a Server?

A **server** is a program that:

- Listens for requests from clients (browser, mobile app, Postman, etc.)
- Processes the incoming request
- Sends an appropriate response back to the client

In web development, servers usually communicate using the **HTTP protocol**.

### 📌 2. Creating Routes in Express

**Create a `server.js` file:**

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("This is About Page");
});

app.get("/home", (req, res) => {
  res.send("This is Home Page");
});

app.listen(3000);
```

**Explanation**

- `express()` → Creates an Express application.
- `app.get()` → Handles HTTP GET requests.
- `req` → Represents the request sent by the client.
- `res` → Sends a response back to the client.
- `app.listen()` → Starts the server on the specified port.

### 📌 3. What is a Port?

A **port** is like a door through which clients communicate with your server.

During development, **port 3000** is commonly used.

```text
http://localhost:3000
```

### 📌 4. Auto Restart Server with Nodemon

Instead of restarting the server manually every time you make changes:

```bash
node server.js
```

Use **Nodemon** to automatically restart the server whenever the code changes:

```bash
npx nodemon server.js
```

This improves the development experience by saving time.

### 📌 5. GitHub Best Practice

Some files and folders should never be pushed to GitHub.

**Do not upload:**

- `node_modules`
- `.env`

**Create a `.gitignore` file:**

```text
node_modules
.env
```

This keeps your repository clean and prevents sensitive information from being exposed.

### 📌 6. What is Deployment?

**Deployment** is the process of making your backend application available on the internet so that users can access it from anywhere, not just from your local machine.

### 📌 7. Common Deployment Platforms

Some popular platforms for deploying backend applications are:

- Render
- Railway
- Vercel (primarily for frontend applications)
- AWS
- DigitalOcean

### 📌 8. Deploying a Backend on Render

Follow these basic steps:

1. Push your project to GitHub.
2. Visit the Render website.
3. Connect your GitHub account.
4. Select **Web Service**.
5. Configure the project:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`

6. Click **Deploy**.

### 📌 9. What is an API?

An **API (Application Programming Interface)** allows different applications to communicate with each other.

Example flow:

```text
Browser → Server → Response
```

### 📌 10. What is a REST API?

A **REST API** follows standard HTTP methods to perform different operations on data.

- **GET** → Read data
- **POST** → Create new data
- **PUT** → Update existing data
- **DELETE** → Remove data

### 🎯 Day 2 Summary

- Learned what a server is and how it responds to client requests.
- Created routes using Express.
- Understood the purpose of ports.
- Used Nodemon for automatic server restarts.
- Learned GitHub best practices using `.gitignore`.
- Understood the concept of deployment.
- Learned the basic steps to deploy a backend using Render.
- Understood what APIs are and how REST APIs work using HTTP methods.

---

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

## 🚀 Day 4 - HTTP Status Codes, REST API Best Practices & Introduction to MongoDB

### 📌 1. HTTP Status Codes

HTTP status codes are **three-digit numbers** returned by the server to indicate the result of a client's request.

They are divided into five categories:

| Status Code Range | Category      | Meaning                                       |
| ----------------- | ------------- | --------------------------------------------- |
| **1xx**           | Informational | Request received, processing continues.       |
| **2xx**           | Success       | Request completed successfully.               |
| **3xx**           | Redirection   | Client needs to take additional action.       |
| **4xx**           | Client Error  | The request contains an error.                |
| **5xx**           | Server Error  | The server failed to process a valid request. |

### 📌 2. Common HTTP Status Codes

#### **2xx - Success**

| Code               | Meaning                                       | Example                   |
| ------------------ | --------------------------------------------- | ------------------------- |
| **200 OK**         | Request completed successfully.               | Successful GET request    |
| **201 Created**    | New resource created successfully.            | Successful POST request   |
| **204 No Content** | Request succeeded but no content is returned. | Successful DELETE request |

#### **3xx - Redirection**

| Code                      | Meaning                                          | Example                       |
| ------------------------- | ------------------------------------------------ | ----------------------------- |
| **301 Moved Permanently** | Resource has moved permanently.                  | Redirect old URL to a new URL |
| **302 Found**             | Temporary redirect.                              | Temporary URL change          |
| **304 Not Modified**      | Resource has not changed since the last request. | Browser caching               |

#### **4xx - Client Errors**

| Code                         | Meaning                                               | Example                                |
| ---------------------------- | ----------------------------------------------------- | -------------------------------------- |
| **400 Bad Request**          | Invalid request syntax or missing data.               | Missing required fields                |
| **401 Unauthorized**         | Authentication is required.                           | Invalid or missing token               |
| **403 Forbidden**            | User is authenticated but doesn't have permission.    | Access denied                          |
| **404 Not Found**            | Requested resource doesn't exist.                     | Invalid endpoint                       |
| **405 Method Not Allowed**   | HTTP method isn't supported.                          | POST on a GET-only route               |
| **409 Conflict**             | Resource conflict occurred.                           | Duplicate or related resource conflict |
| **422 Unprocessable Entity** | Request syntax is valid but data cannot be processed. | Duplicate email                        |

#### **5xx - Server Errors**

| Code                          | Meaning                                  | Example                     |
| ----------------------------- | ---------------------------------------- | --------------------------- |
| **500 Internal Server Error** | Unexpected server error.                 | Server crash                |
| **501 Not Implemented**       | Requested functionality isn't supported. | Feature not implemented     |
| **503 Service Unavailable**   | Server is temporarily unavailable.       | Maintenance or high traffic |

### 📌 3. RESTful API Design Best Practices

Follow these practices while designing REST APIs:

- Use **nouns** to represent resources.
- Use **plural nouns** for collections.
- Follow standard HTTP methods correctly.
- Return appropriate HTTP status codes.
- Keep API endpoints consistent and predictable.
- Design **stateless APIs**, where every request contains all the required information.

**Examples**

```text
GET /users
POST /users
GET /products
DELETE /products/5
PATCH /users/2
```

### 📌 4. What is a Database?

A **database** is a collection of organized data that allows applications to store, retrieve, update, and delete information efficiently.

Examples of stored data:

- Users
- Products
- Orders
- Notes
- Blogs

### 📌 5. What is MongoDB?

MongoDB is a **NoSQL**, **document-based database**.

Instead of storing data in tables like SQL databases, MongoDB stores data in **JSON-like documents (BSON)**.

Example document:

```json
{
  "title": "Learn MongoDB",
  "description": "MongoDB basics",
  "createdAt": "2026-02-05"
}
```

### 📌 6. What is MongoDB Atlas?

**MongoDB Atlas** is MongoDB's cloud database service.

It allows you to host databases online without installing MongoDB on your local machine.

Features:

- Free cluster
- Automatic backups
- High security
- Easy scaling

### 📌 7. What is a Cluster?

A **cluster** is a group of servers that work together to store and manage databases.

Think of it like this:

```text
MongoDB Atlas
      │
      ▼
   Cluster
      │
      ├── Database 1
      ├── Database 2
      └── Database 3
```

A cluster contains:

- Storage
- Processor (CPU)
- Memory (RAM)

When creating a cluster, you choose:

- Cloud provider (AWS, Azure, Google Cloud)
- Region (Mumbai, Singapore, etc.)
- Cluster tier (Free M0 or Paid)

### 📌 8. What is Latency?

**Latency** is the time taken for data to travel between your application and the database server.

**Example**

- User in India + Database in Mumbai → Low latency
- User in India + Database in USA → Higher latency

Choosing a nearby region improves performance.

### 📌 9. Database Hierarchy

The relationship between clusters and databases is:

```text
MongoDB Atlas
      │
      ▼
   Cluster
      │
      ▼
  Database
      │
      ▼
 Collections
      │
      ▼
 Documents
```

A single cluster can contain multiple databases.

### 📌 10. What is Mongoose?

**Mongoose** is an **ODM (Object Data Modeling)** library for MongoDB.

It helps developers:

- Define schemas
- Create models
- Validate data
- Perform CRUD operations easily

Install Mongoose:

```bash
npm install mongoose
```

### 📌 11. Connecting MongoDB Using Mongoose

```js
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
```

### 📌 12. Understanding the Connection String

A MongoDB connection string looks like this:

```text
mongodb+srv://username:password@cluster0.mongodb.net/day-04
```

**Breakdown**

- `mongodb+srv://` → MongoDB connection protocol.
- `username` → Database username.
- `password` → Database password.
- `cluster0.mongodb.net` → Your MongoDB Atlas cluster.
- `day-04` → Database name.

If the specified database already exists, Mongoose connects to it.

If it does not exist, MongoDB automatically creates it when data is inserted.

### 📌 13. Connecting to a Specific Database

```js
const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(
    "mongodb+srv://username:password@cluster0.mongodb.net/day-04",
  );
}
```

Here:

- Connection is established with the cluster.
- The database named **day-04** is selected.
- If the database doesn't exist, MongoDB creates it automatically when the first document is saved.

### 📌 14. Types of Servers

Servers are specialized computers that store, process, and manage resources.

Common types include:

- **Web Server** – Hosts websites.
- **Database Server** – Stores and manages databases.
- **File Server** – Stores and shares files.
- **Email Server** – Sends and receives emails.
- **Application Server** – Runs backend applications.

### 🎯 Day 4 Summary

- Learned about HTTP status code categories.
- Understood commonly used HTTP status codes.
- Explored REST API design best practices.
- Learned what databases are.
- Understood MongoDB and MongoDB Atlas.
- Learned what a cluster is and how databases are organized.
- Understood latency and why server location matters.
- Installed and connected MongoDB using Mongoose.
- Learned how MongoDB creates databases automatically.
- Explored different types of servers.

---

## 🚀 Full-Stack Notes Application

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
