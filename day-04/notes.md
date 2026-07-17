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
