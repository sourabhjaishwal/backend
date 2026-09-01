## 🚀 Day 6 - Authentication System

Authentication is an important backend concept because the server needs to know **which user is making a request**.

For example:

- Who is trying to create a post?
- Which user owns a particular note?
- Is the user allowed to delete a resource?
- Is the user logged in?

A complete authentication system involves four important concepts:

- Authentication
- Authorization
- Validation
- Verification

### 📌 1. The Four Pillars of an Authentication System

**Authentication**

Authentication answers:

> **Who is making this request?**

It identifies the user making a request.

Examples:

- Login with email and password
- Login with OTP
- Login with Google

**Authorization**

Authorization answers:

> **What is this user allowed to do?**

It controls permissions and access.

Examples:

- Only an admin can delete users.
- Only the owner can edit their profile.
- A normal user can view data but cannot access admin routes.

**Validation**

Validation checks:

> **Is the data in the correct format?**

Examples:

- Is the email valid?
- Is the password long enough?
- Are required fields present?

**Verification**

Verification checks whether information or proof is valid and genuine.

Examples:

- Does the password match the stored password?
- Is an OTP correct?
- Is the email verified?
- Is the JWT valid or expired?

### 📌 2. Authentication

Authentication means identifying the user.

**Authentication = Who are you?**

For example:

```text
User
  ↓
Login with Email and Password
  ↓
Server verifies identity
  ↓
User is authenticated
```

A simple real-life example is showing your ID card at the entrance of a building.

The security system checks:

> Who are you?

### 📌 3. Authorization

Authorization happens after the server knows who the user is.

**Authorization = What are you allowed to do?**

Example:

```text
User logs in
      ↓
Authentication
      ↓
Identity is known
      ↓
Authorization
      ↓
Check permissions
```

A real-life example:

> You are allowed to enter the building, but only managers are allowed to enter the server room.

Authentication confirms your identity.

Authorization checks your permissions.

### 📌 4. Validation

Validation checks whether incoming data follows the expected rules and format.

For example:

```text
Email → Valid email format?
Password → Minimum required length?
Name → Required or not?
```

Validation can happen at multiple levels:

- Frontend validation
- Backend validation
- Database validation

**Frontend Validation**

Frontend validation improves the user experience by checking data before sending it to the server.

However, frontend validation alone is not enough because users can bypass it.

**Backend Validation**

The backend should validate incoming requests before processing or storing data.

Example:

```js
if (!email || !password) {
  return res.status(400).json({
    message: "All fields are required.",
  });
}
```

**Database Validation**

Mongoose schemas can also define validation rules.

Example:

```js
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
});
```

Here:

- `type` defines the data type.
- `required` makes the field mandatory.
- `unique` helps prevent duplicate values.
- `match` checks whether the value follows a pattern.

### 📌 5. Validation Using express-validator

For more structured backend validation, we can use `express-validator`.

**Install**

```bash
npm install express-validator
```

Example:

```js
const { body, validationResult } = require("express-validator");

app.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    res.send("Valid data");
  },
);
```

In this example:

- `body("email").isEmail()` checks the email format.
- `body("password").isLength({ min: 6 })` checks password length.
- `validationResult(req)` collects validation errors.

### 📌 6. Verification

Verification confirms whether data or proof is valid.

Examples:

- Email verification
- OTP verification
- Password verification
- Phone number verification
- JWT verification

A simple email verification flow:

```text
User Registers
      ↓
Server sends verification link
      ↓
User clicks the link
      ↓
Account becomes verified
```

### 📌 7. Why Authentication Is Important

Every serious backend application needs to know:

> Which user made this request?

For example, imagine this API:

```text
POST /api/bank/withdraw
```

The backend needs to know:

- Which user made the request?
- Which bank account belongs to that user?
- Does the user have enough balance?

Another example:

```text
POST /api/posts/create
```

The backend needs to know:

- Who created the post?
- Which user owns the post?

Without authentication, the backend does not know the identity of the user making the request.

### 📌 8. Basic Authentication Flow

A typical authentication flow looks like this:

```text
User Registers
      ↓
Validate Data
      ↓
Hash Password
      ↓
Save User in Database
      ↓
User Logs In
      ↓
Verify Email and Password
      ↓
Create JWT
      ↓
Store JWT in Cookie
      ↓
User Makes Request
      ↓
Server Verifies JWT
      ↓
User Identity is Available
```

### 📌 9. Password Hashing

Passwords should never be stored as plain text.

For example, this is unsafe:

```text
Email: user@example.com
Password: 123456
```

Instead, the password should be converted into a hash before storing it.

**Hashing** is a one-way cryptographic process that converts data into a hashed value.

Example:

```text
Password
   ↓
Hashing
   ↓
Hashed Password
```

The original password should not be stored directly in the database.

### How Password Hashing Works

Hashing converts plain text data, such as a password, into a hashed value.

```text
Plain Text                           Hash

test  ──────────── Hashing ────────────▶  3u9816513r3hi2r2387rnvki2vh378fw8432
```

The important properties of hashing are:

**1. Same input produces the same output**

If the same input is passed through the same hashing process, it will generate the same hash.

```text
test
  │
  ├── Hashing ──▶ 3u9816513r3hi2r2387rnvki2vh378fw8432
  │
  └── Hashing ──▶ 3u9816513r3hi2r2387rnvki2vh378fw8432
```

**2. Hashing is one-way**

A hash cannot be converted back into the original plain text.

```text
Plain Text
    │
    ▼
 Hashing
    │
    ▼
Hash Value
```

For example:

```text
test
  │
  ▼
Hashing
  │
  ▼
3u9816513r3hi2r2387rnvki2vh378fw8432
```

The original value cannot simply be recovered from the hash.

A hashed value can also be passed through a hashing function again, which produces another hash:

```text
3u9816513r3hi2r2387rnvki2vh378fw8432
                    │
                    ▼
                 Hashing
                    │
                    ▼
9i39p232nh2kjf2yp984yeu4e2hr232hrdu
```

**In simple words:**

- Plain text is converted into a hash before storing a password.
- The same input generates the same output when the same hashing process is used.
- A hash cannot be converted back into its original plain text.
- A hash can be passed through a hashing function again to generate another hash.

### 📌 10. Hashing Using MD5

For learning purposes, a password can be hashed using Node.js `crypto`.

Example:

```js
const crypto = require("crypto");

const password = "123456";

const hash = crypto.createHash("md5").update(password).digest("hex");

console.log(hash);
```

**Important:** MD5 is not considered secure for storing passwords in real applications. It is useful here only for understanding the basic concept of hashing.

For real applications, use a password hashing library such as `bcryptjs`.

### 📌 11. Understanding the Hashing Process

**Create the hash object**

```js
const hash = crypto.createHash("md5");
```

This creates a hashing object using the MD5 algorithm.

**Pass the password**

```js
.update(password);
```

The password is passed into the hashing process.

**Generate the final hash**

```js
.digest("hex");
```

This finalizes the hashing process and returns the result as a hexadecimal string.

Example:

```text
Password: 123456
        ↓
Hashing
        ↓
Hashed Value
```

The hash is stored instead of the original password.

### 📌 12. Password Security Using bcryptjs

For real authentication systems, `bcryptjs` should be used instead of MD5.

Install it using:

```bash
npm install bcryptjs
```

The main idea is:

```text
Register
   ↓
Hash Password with bcrypt
   ↓
Save Hash in Database
```

During login:

```text
Entered Password
      ↓
bcrypt.compare()
      ↓
Stored Password Hash
      ↓
Password Match or Not
```

### 📌 13. Cookies

A cookie is small data stored by the browser.

Cookies can be used to maintain user login state and store authentication tokens.

Example:

```text
User Logs In
      ↓
Server sends Cookie
      ↓
Browser stores Cookie
      ↓
Browser sends Cookie with future requests
```

Example in Express:

```js
res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});
```

Important cookie options include:

| Option     | Purpose                                                   |
| ---------- | --------------------------------------------------------- |
| `httpOnly` | Prevents client-side JavaScript from accessing the cookie |
| `secure`   | Sends the cookie only over HTTPS                          |
| `sameSite` | Helps control cross-site cookie behavior                  |

For a complete setup, these options may need to change depending on whether the application is running locally or in production.

### 📌 14. JWT - JSON Web Token

A JWT is a token that can carry information used to identify a user.

JWT stands for:

```text
JSON Web Token
```

A JWT usually has three parts:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

Conceptually:

- **Header** → Information about the token and signing algorithm.
- **Payload** → Data stored inside the token.
- **Signature** → Used to verify that the token has not been modified.

A JWT can be inspected using [JWT.io](https://jwt.io?utm_source=chatgpt.com).

### 📌 15. JWT Authentication Flow

The JWT authentication flow looks like this:

```text
User
  ↓
Login
  ↓
Server verifies credentials
  ↓
JWT is created
  ↓
JWT stored in Cookie
  ↓
User makes another request
  ↓
Cookie sends JWT
  ↓
Server verifies JWT
  ↓
User identity is identified
```

JWT is useful because authentication can be handled without maintaining traditional server-side session storage.

### 📌 16. Creating and Verifying JWT

The `jsonwebtoken` package is commonly used for JWT authentication.

Install it using:

```bash
npm install jsonwebtoken
```

A token is verified using:

```js
jwt.verify(token, process.env.JWT_SECRET);
```

The server uses the secret key to verify that the JWT is valid.

A strong secret key can be generated using tools such as [JWT Secrets](https://jwtsecrets.com?utm_source=chatgpt.com).

The secret key should be stored in environment variables and should never be committed to GitHub.

Example:

```env
JWT_SECRET=your_secret_key
```

### 📌 17. Authentication System Packages

A basic authentication system can use the following packages:

| Package         | Purpose                    |
| --------------- | -------------------------- |
| `express`       | Create the server and APIs |
| `cookie-parser` | Read cookies from requests |
| `jsonwebtoken`  | Create and verify JWTs     |
| `bcryptjs`      | Hash and compare passwords |
| `dotenv`        | Load environment variables |

Install the required packages:

```bash
npm install express cookie-parser jsonwebtoken bcryptjs dotenv
```

### 📌 18. Register API

The register API creates a new user.

Example endpoint:

```text
POST /api/auth/register
```

The basic flow is:

```text
Request
   ↓
Validate Input
   ↓
Check Existing User
   ↓
Hash Password
   ↓
Create User
   ↓
Save to Database
   ↓
Send Response
```

The main responsibilities of the register API are:

- Validate user data.
- Check whether the user already exists.
- Hash the password.
- Save the user in the database.

At this stage, the user's identity is created.

### 📌 19. Login API

The login API verifies the user's credentials.

Example endpoint:

```text
POST /api/auth/login
```

The flow is:

```text
Email + Password
        ↓
Validate Input
        ↓
Find User by Email
        ↓
Compare Password
        ↓
Create JWT
        ↓
Send JWT in Cookie
```

Login is where authentication happens because the server verifies the user's identity.

### 📌 20. Authentication Middleware

Authentication middleware protects routes that require a logged-in user.

Its main job is:

1. Read the cookie.
2. Get the JWT token.
3. Verify the token.
4. Extract user information.
5. Attach the user information to `req.user`.

Conceptually:

```text
Request
   ↓
Authentication Middleware
   ↓
Token Available?
   ├── No → Reject Request
   │
   └── Yes
         ↓
      Verify JWT
         ↓
      Valid?
         ├── No → Reject Request
         │
         └── Yes
               ↓
          Add User to req.user
               ↓
          Continue to Route
```

### 📌 21. Get Logged-In User API

Example endpoint:

```text
GET /api/auth/get-me
```

This API can return information about the currently authenticated user.

The request does not need to send the user's email and password again.

The flow is:

```text
Request
   ↓
Cookie
   ↓
JWT
   ↓
Authentication Middleware
   ↓
req.user
   ↓
Return Logged-In User Data
```

### 📌 22. Authentication System APIs

A basic authentication system can contain these APIs:

| API                       | Purpose                          |
| ------------------------- | -------------------------------- |
| `POST /api/auth/register` | Create a new user                |
| `POST /api/auth/login`    | Authenticate a user              |
| `GET /api/auth/get-me`    | Get the currently logged-in user |

### 📌 23. Complete Authentication Flow

The complete authentication system can be understood like this:

```text
REGISTER

User Data
   ↓
Validation
   ↓
Check Existing User
   ↓
Hash Password
   ↓
Save User


LOGIN

Email + Password
   ↓
Find User
   ↓
Verify Password
   ↓
Create JWT
   ↓
Send JWT in HTTP-Only Cookie


PROTECTED REQUEST

Request
   ↓
Cookie
   ↓
JWT
   ↓
Authentication Middleware
   ↓
Verify JWT
   ↓
req.user
   ↓
Protected Route
```

### 🎯 Day 6 Summary

- Learned the four important concepts: authentication, authorization, validation, and verification.
- Authentication identifies **who the user is**.
- Authorization controls **what the user is allowed to do**.
- Validation checks whether incoming data follows the expected format and rules.
- Verification confirms whether information or proof is valid.
- Learned why passwords should never be stored as plain text.
- Understood password hashing and why `bcryptjs` is preferred for real applications.
- Learned the purpose of cookies in authentication.
- Understood JWT and its role as proof of identity.
- Learned how JWT can be stored in an HTTP-only cookie.
- Understood the register and login flow.
- Learned the purpose of authentication middleware.
- Understood how protected routes can identify the currently logged-in user using `req.user`.
