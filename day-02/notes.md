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