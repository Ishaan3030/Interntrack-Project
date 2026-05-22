# InternTrack 🎯

![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-v5.2-000000?style=flat&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57?style=flat&logo=sqlite&logoColor=white)
![Handlebars](https://img.shields.io/badge/Templating-Handlebars.js-f0772b?style=flat&logo=handlebarsdotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

> **A full-stack web application for tracking internship applications — built by a CS student, for CS students.**
> Stop juggling 50+ applications across spreadsheets and sticky notes. InternTrack gives you a clean, centralized web interface to log every application, role, company, and status — all in one place.

---

## 🌐 Live Demo

> *(Add deployment link here after hosting — e.g., Render, Railway, or Fly.io)*

---

## 📸 Screenshots

> *(Add screenshots of the running app here — the application form and the applications list)*

---

## 💡 The Problem This Solves

CS students applying for internships typically submit 40–80+ applications per recruiting cycle. Tracking each company's name, role, recruiter contact, and current status across email threads, browser tabs, and memory is error-prone and stressful. A missed follow-up or forgotten status update can cost a real opportunity.

InternTrack provides a purpose-built, locally-hosted web app that functions as a lightweight personal CRM for your job search — accessible entirely through your browser, with no third-party accounts or cloud dependencies required.

---

## ✨ Features

- ✅ **Log applications** — capture applicant name, target role, company, and current status in one form
- 📋 **View all applications** — see every logged application in a structured list
- 🔗 **REST API layer** — all data operations handled through clean API endpoints
- 🩺 **Health check endpoint** — confirm the server is running at `/healthcheck`
- 📝 **Server-side logging** — request and event logging via a dedicated logger module
- 🗄️ **Persistent local storage** — SQLite database keeps data between server restarts
- ⚡ **Fast startup** — zero-config database, no external services required

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Runtime | Node.js | v20+ | JavaScript server runtime |
| Framework | Express | v5.2.1 | HTTP server, routing, middleware |
| Database | better-sqlite3 | v12.10.0 | Embedded SQLite — fast, file-based, zero setup |
| Templating | Express-Handlebars | v5.3.5 | Server-side HTML rendering |
| Utilities | moment.js | v2.30.1 | Date formatting and display |
| Utilities | uuid | v14.0.0 | Unique ID generation for records |
| Dev Tools | nodemon | v3.1.14 | Auto-restart server on file changes |
| Dev Tools | dotenv | v17.4.2 | Environment variable management |
| Cross-Origin | cors | v2.8.6 | Cross-Origin Resource Sharing support |

**Architecture:** Server-rendered MVC web application. Express handles routing and business logic; Handlebars templates render HTML on the server; SQLite persists application data locally via `better-sqlite3`.

---

## 📁 Project Structure

```
Interntrack-Project/
├── server.js              # Express app entry point — configures middleware, routes, and server startup
├── db.js                  # SQLite database initialization and schema definition
├── Application.js         # Application data model / class definition
├── applications.js        # API route handlers — CRUD operations for internship applications
├── logger.js              # Request and event logging utility
├── index.handlebars       # Main view — application submission form + applications list
├── main.handlebars        # Root layout template — wraps all page views
├── healthcheck.html       # Static health check page served at /healthcheck
├── style.css              # Application stylesheet
├── intertrack.db          # SQLite database file (auto-generated on first run)
├── interntrack.db-wal     # SQLite Write-Ahead Log (auto-generated)
├── package.json           # Dependencies and npm scripts
└── package-lock.json      # Locked dependency tree
```

---

## 🔌 API Reference

All application data is managed through the following REST endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/applications` | Submit a new internship application |
| `GET` | `/api/applications` | Retrieve all logged applications |
| `GET` | `/healthcheck` | Confirm server is running |

### Application Data Model

Each application record captures the following fields:

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Auto-generated unique identifier |
| `name` | String | Applicant name |
| `role` | String | Target internship role (e.g., "Software Engineering Intern") |
| `company` | String | Company name (e.g., "Mastercard") |
| `status` | String | Current application status (e.g., "Applied", "Phone Screen", "Offer") |

### Example — Add an Application

```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Ishaan Sengupta&role=Software Engineering Intern&company=Mastercard&status=Applied"
```

### Example Response (GET /api/applications)

```json
[
  {
    "id": "a3f2c1d4-...",
    "name": "Ishaan Sengupta",
    "role": "Software Engineering Intern",
    "company": "Mastercard",
    "status": "Applied"
  }
]
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js v18+](https://nodejs.org/) — includes npm
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Ishaan3030/Interntrack-Project.git
cd Interntrack-Project
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment (optional)**

Create a `.env` file in the root directory to customize the port:
```env
PORT=3000
```
If no `.env` file is provided, the server defaults to port 3000.

**4. Start the server**

For production:
```bash
npm start
```

For development (auto-restarts on file changes):
```bash
npm run dev
```

**5. Open the app**

Navigate to `http://localhost:3000` in your browser. The application form and list view will load immediately.

To confirm the server is healthy, visit: `http://localhost:3000/healthcheck`

> **Note:** The SQLite database (`intertrack.db`) is created automatically on first run. No manual database setup required.

---

## 🖥️ Using the App

1. **Fill out the form** on the main page:
   - **Name** — application name
   - **Role** — the internship title you applied for
   - **Company** — the company name
   - **Status** — where you are in the process (e.g., Applied, Phone Screen, Technical Interview, Offer, Rejected)

2. **Click "Add Application"** — the record is saved to the SQLite database immediately

3. **View your applications** — all logged entries appear in a list below the form, or navigate to `/api/applications` to see the raw JSON

---

## 🧠 What I Built & Learned

This project was built from scratch as a portfolio piece to demonstrate full-stack web development skills using Node.js.

**Technical skills demonstrated:**

- Designed and implemented a **RESTful API** with Express.js v5, handling HTTP routing, middleware configuration, and form data parsing
- Modeled and persisted **relational data** using SQLite via `better-sqlite3`, including schema design with UUID primary keys and auto-initialization on startup
- Built a **server-rendered MVC web application** using Express-Handlebars for dynamic HTML templating — separating layout, view, and data concerns cleanly
- Implemented a **custom logging module** (`logger.js`) to track server-side events and requests
- Integrated a **health check endpoint** following standard production API design practices
- Managed **project configuration** with `dotenv` for environment-variable-driven port settings
- Used **`nodemon`** for efficient local development with automatic server restarts

---

## 🗺️ Future Enhancements

- [ ] Edit and delete existing application records
- [ ] Status dropdown with predefined pipeline stages (Applied → Phone Screen → Technical → Offer → Rejected)
- [ ] Color-coded status badges for quick visual scanning
- [ ] Date tracking — log when each application was submitted and when status last changed
- [ ] Search and filter by company name or status
- [ ] Export all applications to CSV
- [ ] React or vanilla JS frontend to replace page-refresh form submissions (AJAX)
- [ ] User authentication so multiple users can maintain separate boards
- [ ] Deployment to cloud hosting (Render, Railway, or Fly.io)

---

## 👤 Author

**Ishaan Sengupta**
Missouri University of Science and Technology — B.S. Computer Science, Class of 2029

[![GitHub](https://img.shields.io/badge/GitHub-Ishaan3030-181717?style=flat&logo=github)](https://github.com/Ishaan3030)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ishaansengupta-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/ishaansengupta)

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
