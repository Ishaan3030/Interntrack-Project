# InternTrack 📋

> A full-stack internship application tracking dashboard built with Node.js, Express, Handlebars, and SQLite.  
> Built for CS students managing 40–80+ applications across companies, roles, and pipeline stages.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Handlebars](https://img.shields.io/badge/Handlebars-Template-f0772b)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## What It Does

Keeping track of dozens of internship applications across different companies, roles, and stages is messy. InternTrack gives you a clean, centralized dashboard to add, edit, delete, and filter every application — with status tracking, date logging, and CSV export.

---

## Features

- **Add applications** — name, role, company, status, date applied
- **Edit existing records** — inline edit form with pre-filled fields
- **Delete with confirmation** — "Are you sure?" modal with Cancel / Confirm before deleting
- **Status pipeline** — predefined stages: Applied → Phone Screen → Technical → Offer → Rejected
- **Color-coded status badges** — instant visual scanning of application stages
- **Date tracking** — logs date applied and date status last changed
- **Live search** — filter by company name or role in real time
- **Status filter** — dropdown to filter by pipeline stage
- **Live stats bar** — running count of applications per stage
- **Export to CSV** — download all applications as a spreadsheet
- **REST API** — full JSON API accessible at `/api/applications`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | Handlebars (express-handlebars) |
| Database | SQLite (via better-sqlite3) |
| Styling | Bootstrap 4 + Custom CSS |
| Middleware | method-override, cors, dotenv |
| ID Generation | uuid |

---

## Project Structure

```
interntrack/
├── server/
│   ├── server.js                  # Express app entry point
│   ├── Applications.js            # Seed data (in-memory fallback)
│   ├── db.js                      # SQLite database setup
│   ├── middleware/
│   │   └── logger.js              # Request logger middleware
│   ├── routes/
│   │   └── api/
│   │       └── applications.js    # All CRUD + export routes
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars    # Base layout template
│   │   └── index.handlebars       # Main dashboard view
│   └── public/
│       └── css/
│           └── style.css          # Custom styles + status badges
└── client/                        # React frontend (future)
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Ishaan3030/Interntrack-Project.git
cd Interntrack-Project/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `server/` directory:

```
PORT=3000
```

### 4. Start the server

```bash
node server.js
```

Open your browser to `http://localhost:3000`

---

## API Endpoints

The full REST API is accessible at `/api/applications`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/applications` | Get all applications (JSON) |
| `GET` | `/api/applications/:id` | Get single application by ID |
| `POST` | `/api/applications` | Create new application |
| `PUT` | `/api/applications/:id` | Update existing application |
| `DELETE` | `/api/applications/:id` | Delete application |
| `POST` | `/api/applications/delete/:id` | Delete (form fallback) |
| `GET` | `/api/applications/export` | Download all applications as CSV |

### Example POST body

```json
{
  "name": "Ishaan Sengupta",
  "role": "Software Engineer Intern",
  "company": "Mastercard",
  "status": "Applied"
}
```

---

## Status Pipeline

Applications move through these predefined stages:

```
Applied → Phone Screen → Technical → Offer → Rejected
```

Each stage has a color-coded badge for instant visual scanning:

| Status | Color |
|---|---|
| Applied | 🔵 Blue |
| Phone Screen | 🟡 Yellow |
| Technical | 🟢 Green |
| Offer | ✅ Dark Green |
| Rejected | 🔴 Red |

---

## Future Enhancements

- [ ] React or vanilla JS frontend to replace page-refresh form submissions (AJAX)
- [ ] User authentication — multiple users with separate boards
- [ ] Sentiment trend by application date (time-series view)
- [ ] Deployment to cloud hosting (Render, Railway, or Fly.io)
- [ ] Email reminders for stale applications
- [ ] Company logo auto-fetch via Clearbit API

---

## Author

**Ishaan Sengupta**  
B.S. Computer Science — Missouri University of Science & Technology (Class of 2029)  
GitHub: [github.com/Ishaan3030](https://github.com/Ishaan3030)  
LinkedIn: [linkedin.com/in/ishaansengupta](https://linkedin.com/in/ishaansengupta)

---

## License

This project is licensed under the MIT License.
