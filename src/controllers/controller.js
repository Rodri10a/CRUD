const pool = require('../models/db')

// ── TOPICS ──

const getAllTopics = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM topics ORDER BY votes DESC')
  res.render('topics/index', { topics: rows })
}

const getNewTopicForm = (req, res) => res.render('topics/new')

const createTopic = async (req, res) => {
  await pool.query('INSERT INTO topics (title, description) VALUES ($1, $2)', [req.body.title, req.body.description])
  res.redirect('/')
}

module.exports = { getAllTopics, getNewTopicForm, createTopic }
