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
