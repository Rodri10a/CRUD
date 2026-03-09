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

const showTopic = async (req, res) => {
  const { rows: [topic] } = await pool.query('SELECT * FROM topics WHERE id = $1', [req.params.id])
  if (!topic) return res.status(404).send('Topic no encontrado')
  const { rows: links } = await pool.query('SELECT * FROM links WHERE topic_id = $1 ORDER BY votes DESC', [req.params.id])
  topic.links = links
  res.render('topics/show', { topic })
}

module.exports = { getAllTopics, getNewTopicForm, createTopic, showTopic }
