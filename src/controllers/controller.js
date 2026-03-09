const pool = require('../models/db')

// ── TOPICS ──

const getAllTopics = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM topics ORDER BY votes DESC')
  res.render('topics/index', { topics: rows })
}

module.exports = { getAllTopics }
