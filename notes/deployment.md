# Deployment

The Day 5 Notes Application was deployed to the cloud by hosting the **frontend** and **backend** separately.

### 🌐 1. Frontend Deployment - Vercel

The React frontend was deployed using **Vercel**.

The frontend deployment flow is:

```text
Frontend
   ↓
npm run build
   ↓
dist/
   ↓
Vercel
```

The `npm run build` command creates an optimized production build of the React application.

The generated `dist` folder contains the production-ready files that can be deployed and served to users.

**Deployment Platform:**

- Frontend → Vercel

### ⚙️ 2. Backend Deployment - Render

The Express backend was deployed using **Render**.

The backend runs separately from the frontend and provides the REST API used by the React application.

**Deployment Platform:**

- Backend → Render

The backend deployment flow is:

```text
Backend
   ↓
Render
   ↓
REST API
```

### 🗄️ 3. Database - MongoDB Atlas

The application database is hosted using **MongoDB Atlas**.

The backend connects to MongoDB Atlas using the MongoDB connection string stored in an environment variable.

```env
MONGO_URI=your_mongodb_connection_string
```

The database flow is:

```text
Express Backend
      ↓
Mongoose
      ↓
MongoDB Atlas
```

### 🔄 4. Complete Deployment Architecture

The complete Notes Application works like this:

```text
React Frontend
      ↓
Vercel
      ↓
HTTP API Requests
      ↓
Express Backend
      ↓
Render
      ↓
Mongoose
      ↓
MongoDB Atlas
```

### 📦 5. Frontend Production Build

Before deploying the frontend, the React application is converted into production-ready files.

Run:

```bash
npm run build
```

This generates:

```text
dist/
├── assets/
├── favicon.svg
├── icons.svg
└── index.html
```

The `dist` directory contains the optimized version of the frontend application that is ready for deployment.

### 💰 6. Deployment Resource Notes

The deployment diagrams used during the project demonstrated that hosting costs and available resources depend on the hosting provider, plan, and application requirements.

The basic deployment setup used in this project is:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

The application can later be scaled by upgrading the hosting resources as the number of users and traffic increases.

### 🎯 Summary

- Deployed the React frontend using Vercel.
- Built the frontend using `npm run build`.
- Learned that the production build generates a `dist` folder.
- Deployed the Express backend using Render.
- Connected the deployed backend to MongoDB Atlas.
- Understood how frontend, backend, and database work together after deployment.
- Learned the basic architecture of deploying a full-stack application.
