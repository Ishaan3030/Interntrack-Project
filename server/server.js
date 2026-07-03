// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
require('dotenv').config();
 
const applications = require('./Applications');
const app          = express();
 
// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
// method-override: reads _method from POST body (used by Handlebars forms)
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
 
// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

// ── Handlebars setup ───────────────────────────────────────────────────────────
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    // Used in edit form to pre-select the current status option
    ifEq: function (a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this);
    },
    // Format "YYYY-MM-DD" dates for display
    formatDate: function (dateStr) {
      if (!dateStr) return '—';
      const d = new Date(dateStr);
      return isNaN(d) ? dateStr : d.toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
    },
  },
});
 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
 
// ── Routes ─────────────────────────────────────────────────────────────────────
 
// Home — render dashboard
app.get('/', (req, res) => {
  res.render('index', { title: 'InternTrack', applications });
});
 
// API routes
app.use('/api/applications', require('./routes/api/applications'));
 
// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`InternTrack running on http://localhost:${PORT}`));