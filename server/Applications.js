// Applications.js
// Seed data — used when the app starts.
// IDs are strings to match uuid.v4() format used in POST route.
// Once SQLite is fully wired, this file can be retired.
 
const applications = [
  {
    id: "1",
    name: "Ishaan Sengupta",
    role: "Software Engineer Intern",
    company: "Google",
    status: "Applied",
    date_applied: "2026-05-01",
    status_updated: "2026-05-01",
  },
  {
    id: "2",
    name: "Ishaan Sengupta",
    role: "Data Scientist Intern",
    company: "Mastercard",
    status: "Phone Screen",
    date_applied: "2026-05-03",
    status_updated: "2026-05-10",
  },
  {
    id: "3",
    name: "Ishaan Sengupta",
    role: "Full Stack Intern",
    company: "Amazon",
    status: "Rejected",
    date_applied: "2026-04-20",
    status_updated: "2026-05-05",
  },
];
 
module.exports = applications;
