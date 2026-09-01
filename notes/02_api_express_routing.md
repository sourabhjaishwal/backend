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
