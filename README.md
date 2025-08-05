# Frontend Repository for Kit-IT 🖥️

This repository contains the frontend code for **Kit-IT**, a school project focused on building a web service platform for IT service management.

---

## Project Summary (School Context)

Kit-IT is a fictional IT service company. The project includes:

- Account registration and login (JWT-based auth)
- Appointment booking and service browsing
- Real-time customer support via chat
- User data and order management

---

## Technologies Used

- **React.js** – Main UI library
- **CSS** – For styling and visual layout
- **React Router DOM** – Client-side routing and navigation
- **Axios** – For making API requests
- **PrivateRoute component** – For handling protected routes

---

## Routing and Navigation

Routing is handled using **React Router DOM**. Routes are split into public and protected. Public routes are accessible without login, while all others require authentication.

### **Public Routes**
- `/` – Login page
- `/register` – Registration page

### **Protected Routes**
- `/home` – Home page
- `/about` – About us
- `/orderAppointments` – Make an appointment
- `/services` – View services
- `/accountControl` – Account management
- `/purchase` – Checkout process
- `/shoppingCart` – Shopping cart

**Note:** The only routes accessible without logging in are `/` and `/register`.

---

## Getting Started

1. Clone the repo:

```bash
git clone <repository-url>
cd main
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-secret>
PORT=<your-port>
```

4. Start the server:

```bash
npm start
```

---

## API Routes

### `/api/auth`
- `POST /login` – Login
- `POST /register` – Register
- `POST /clearCookie` – Logout

### `/api/user`
- Manage user data

### `/api/products`
- View/manage products

### `/api/appointments`
- Bookings (with time validation)

---

## CI/CD

GitHub Actions automates simple testing and simple npm publishing on pull requests.

> ⚠️ This project is part of a **school assignment** intended for learning and educational purposes only. It is **not intended for real-world business use** and is not in active production.

