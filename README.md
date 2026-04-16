# Fintola – Finance Dashboard

## 📌 Project Overview

Fintola is a full-stack fintech dashboard designed to manage and track financial transactions with role-based access and analytics. It provides a clean SaaS-style interface with secure authentication, advanced filtering, and real-time interaction with backend APIs.

---

## 🔗 Links

* **Live Frontend:** https://fintola-two.vercel.app
* **Backend Repository:** https://github.com/Jay31kr/fintola

---

## 🔑 Demo Credentials

### Admin

* Email: [testadmin1@gmail.com](mailto:testadmin1@gmail.com)
* Password: 12345678

### Viewer

* Email: [test@gmail.com](mailto:test@gmail.com)
* Password: 12345678

### Analyst

* Email: [testanalyst49@gmail.com](mailto:testanalyst49@gmail.com)
* Password: 12345678

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router
* Redux
* React Hot Toast
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication (cookie-based)
* Nodemailer
* Bcrypt
* Dotenv
* CORS
* Cookie-parser

---

## 🚀 Features

### Authentication & Authorization

* Secure login using JWT (cookie-based authentication)
* Protected routes with route-level guarding
* Role-based access (Admin, Viewer, Analyst)

### Transactions Management

* Create new transactions
* View transactions with pagination
* Advanced filtering:

  * Type
  * Category
  * Status
  * Date range
* Inline editing of transactions
* Delete transactions

### UI/UX

* Responsive SaaS-style interface
* Toast notifications for success and error feedback
* Clean, structured dashboard layout
* Reusable and modular components

### Dashboard

* Insights and analytics using charts (Recharts)

---

## 📂 Project Structure (Frontend)

```
src/
├── components/        # Reusable UI components
├── pages/             # Page-level components
├── services/          # API configuration (Axios)
├── App.jsx            # Layout (Navbar + container)
├── main.jsx           # Routing configuration
```

---

## ⚙️ Setup Instructions

### Frontend

1. Clone the repository

   ```bash
   git clone https://github.com/Jay31kr/fintola-webApp.git
   cd <project-folder>
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file

   ```env
   VITE_API_URL=https://fintola.onrender.com
   ```

4. Run the development server

   ```bash
   npm run dev
   ```

---

### Backend

Refer to the backend repository for setup instructions:
https://github.com/Jay31kr/fintola

---

## 🧠 Key Highlights

* Modular component-based architecture
* API-first development approach 
* Clean and scalable state management
* Production-ready UI practices
* Proper authentication flow with protected routes

---

## 📌 Future Improvements

* Enhanced analytics dashboard
* Advanced role-based UI control
* Performance optimizations
* Global state optimization with Redux

---

## 👨‍💻 Author

Jay Kumar Gupta
