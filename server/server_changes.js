// ============================================
// CHANGES NEEDED IN server.js
// ============================================

// 1. After you set up your hbs/express-handlebars engine, register this helper:
hbs.registerHelper('ifEq', function(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

// That's the only change needed in server.js.
// The helper lets the edit form pre-select the current status in the dropdown.


// ============================================
// CHANGES NEEDED IN applications.js
// ============================================

// Add this new route BEFORE your existing routes (above the GET '/' route):

// Export all applications as CSV
router.get('/export', (req, res) => {
  const rows = db.prepare('SELECT * FROM applications').all();

  const headers = ['ID', 'Name', 'Role', 'Company', 'Status'];
  const csvRows = rows.map(r =>
    [r.id, r.name, r.role, r.company, r.status]
      .map(val => `"${String(val).replace(/"/g, '""')}"`) // escape quotes
      .join(',')
  );

  const csv = [headers.join(','), ...csvRows].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="interntrack_applications.csv"');
  res.send(csv);
});

// NOTE: Make sure this /export route is defined BEFORE router.get('/:id', ...)
// otherwise Express will try to match "export" as an :id parameter and it will fail.
