const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

const app = express()

app.use(cors())
app.use(express.json())

// Connect to SQLite
const db = new sqlite3.Database('./jobs.db', (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Connected to SQLite database.')
  }
})

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    role TEXT,
    status TEXT
  )
`)


// GET all applications
app.get('/applications', (req, res) => {
  db.all(
    `SELECT * FROM applications ORDER BY datetime(date) DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err)

      res.json(rows)
    }
  )
})


// POST new application
app.post('/applications', (req, res) => {
  const { company, role, status } = req.body

  const date = new Date().toISOString()

  db.run(
    `INSERT INTO applications (company, role, status, date)
     VALUES (?, ?, ?, ?)`,
    [company, role, status, date],
    function (err) {
      if (err) return res.status(500).json(err)

      res.json({
        id: this.lastID,
        company,
        role,
        status,
        date,
      })
    }
  )
})


// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000')
})

//Put route
app.put('/applications/:id', (req, res) => {
  const { id } = req.params
  const { status } = req.body

  db.run(
    `UPDATE applications SET status = ? WHERE id = ?`,
    [status, id],
    function (err) {
      if (err) {
        return res.status(500).json(err)
      }

      res.json({
        message: 'Status updated',
        id,
        status,
      })
    }
  )
})

// Delete route
app.delete('/applications/:id', (req, res) => {
  const { id } = req.params

  db.run(
    `DELETE FROM applications WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json(err)
      }

      res.json({
        message: 'Application deleted',
        id,
      })
    }
  )
})

//Get status
app.get('/api/applications/stats', (req, res) => {
  const query = `
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'Applied' THEN 1 ELSE 0 END) as applied,
      SUM(CASE WHEN status = 'Interview' THEN 1 ELSE 0 END) as interview,
      SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) as rejected,
      SUM(CASE WHEN status = 'Offer' THEN 1 ELSE 0 END) as offer
    FROM applications
  `

  db.get(query, [], (err, row) => {
    if (err) {
      return res.status(500).json(err)
    }

    res.json(row)
  })
})