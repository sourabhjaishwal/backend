# Backend Notes

This is a learning repository for understanding backend concepts from zero.

## 📚 Table of Contents

- Day 1 - Node.js Basics, NPM, and Express
- Day 2 - REST API & Express Routing
- Day 3 - Coming Soon

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

### 📦 2. What is NPM?

- **NPM (Node Package Manager)** comes with Node.js.
- It is used to install reusable code packages created by other developers.

**What is a package?**

A package is a ready-made piece of code you can use in your project.

### 📥 3. Installing a Package

Example package: `cat-me`

```bash
npm install cat-me
```

This creates:

- `node_modules/` → stores installed packages
- `package.json` → project details + dependencies
- `package-lock.json` → locks exact versions

### 📄 4. Using a Package

Create `app.js`:

```js
const catMe = require("cat-me");

console.log(catMe());
```

Run it:

```bash
node app.js
```

### 📁 5. Important Files

**node_modules:** Stores all installed dependencies.

**package.json**
Contains:

- Project info
- Dependencies
- Scripts

**package-lock.json**
Locks exact versions to avoid errors across systems.

### 🌐 6. What is a Server?

**A server is a program that:**

- Listens for requests
- Sends responses

### ⚙️ 7. Creating a Basic Express Server

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

### 🌐 1. Creating Routes in Express

**Create `server.js`:**

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

### 🔌 2. What is a Port?

- A port is like a door for your server.
- Example: `3000` is commonly used for development.

```
http://localhost:3000
```

### 🔄 3. Auto Restart Server (Nodemon)

**Instead of restarting manually:**

```bash
node server.js
```

**Use:**

```bash
npx nodemon server.js
```

Now server restarts automatically when you change code.

### 🚫 4. GitHub Best Practice

**Do NOT upload:**

- `node_modules`
- `.env`

**Create a `.gitignore` file:**

```
node_modules
.env
```

### ☁️ 5. Deploying Backend (Render)

**Steps:**

1. Push code to GitHub
2. Go to Render website
3. Connect GitHub repo
4. Select **Web Service**
5. Set:
   - Build Command: `npm install`
   - Start Command: `node server.js`

6. Click Deploy

### 📡 6. What is an API?

An API allows apps to communicate with each other.

Example:

- Browser → Server → Response

### 🔁 7. What is REST API?

**REST API uses standard methods:**

- GET → Read data
- POST → Create data
- PUT → Update data
- DELETE → Delete data

### 🎯 Day 2 Summary

- Created routes using Express
- Learned about servers and ports
- Used Nodemon for auto restart
- Understood APIs and REST API basics
- Learned deployment using Render
- Used `.gitignore` for clean projects

---

## 🚀 Day 3 Plan

Coming soon – API building, CRUD operations, middleware, and MongoDB integration
