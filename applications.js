// routes/api/applications.js
// Handles all CRUD operations + CSV export for internship applications.
 
const express = require('express');
const uuid    = require('uuid');
const router  = express.Router();
const applications = require('../../Applications');
 
const VALID_STATUSES = ['Applied', 'Phone Screen', 'Technical', 'Offer', 'Rejected'];
 
// ── Helper ─────────────────────────────────────────────────────────────────────
function today() {
  return new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
}
 
// ── GET /api/applications — all applications (JSON) ───────────────────────────
router.get('/', (req, res) => {
  res.json(applications);
});
 
// ── GET /api/applications/export — download CSV ───────────────────────────────
// IMPORTANT: must be defined BEFORE /:id or Express matches "export" as an id.
router.get('/export', (req, res) => {
  const headers = ['ID', 'Name', 'Role', 'Company', 'Status', 'Date Applied', 'Status Updated'];
  const rows = applications.map(a =>
    [a.id, a.name, a.role, a.company, a.status, a.date_applied, a.status_updated]
      .map(val => `"${String(val ?? '').replace(/"/g, '""')}"`)
      .join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="interntrack_applications.csv"');
  res.send(csv);
});
 
// ── GET /api/applications/:id — single application ────────────────────────────
router.get('/:id', (req, res) => {
  const app = applications.find(a => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ msg: `No application with id ${req.params.id}` });
  }
  res.json(app);
});
 
// ── POST /api/applications — create new application ───────────────────────────
router.post('/', (req, res) => {
  const { name, role, company, status } = req.body;
 
  if (!name || !role || !company) {
    return res.status(400).json({ msg: 'Please include name, role, and company.' });
  }
 
  const resolvedStatus = VALID_STATUSES.includes(status) ? status : 'Applied';
 
  const newApplication = {
    id:             uuid.v4(),
    name:           name.trim(),
    role:           role.trim(),
    company:        company.trim(),
    status:         resolvedStatus,
    date_applied:   today(),
    status_updated: today(),
  };
 
  applications.push(newApplication);
  res.redirect('/');
});
 
// ── POST /api/applications/delete/:id — delete (method-override fallback) ─────
router.post('/delete/:id', (req, res) => {
  const index = applications.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    applications.splice(index, 1);
    return res.redirect('/');
  }
  res.status(404).json({ msg: `No application with id ${req.params.id}` });
});
 
// ── DELETE /api/applications/:id — delete (method-override) ───────────────────
router.delete('/:id', (req, res) => {
  const index = applications.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    applications.splice(index, 1);
    return res.redirect('/');
  }
  res.status(404).json({ msg: `No application with id ${req.params.id}` });
});
 
// ── PUT /api/applications/:id — update application ────────────────────────────
router.put('/:id', (req, res) => {
  const app = applications.find(a => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ msg: `No application with id ${req.params.id}` });
  }
 
  const prevStatus = app.status;
 
  app.name    = req.body.name    ? req.body.name.trim()    : app.name;
  app.role    = req.body.role    ? req.body.role.trim()    : app.role;
  app.company = req.body.company ? req.body.company.trim() : app.company;
 
  if (req.body.status && VALID_STATUSES.includes(req.body.status)) {
    app.status = req.body.status;
    // Only update status_updated if status actually changed
    if (app.status !== prevStatus) {
      app.status_updated = today();
    }
  }
 
  res.redirect('/');
});
 
module.exports = router;
