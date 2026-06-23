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