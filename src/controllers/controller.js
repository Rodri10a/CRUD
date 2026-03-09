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

const getEditTopicForm = async (req, res) => {
  const { rows: [topic] } = await pool.query('SELECT * FROM topics WHERE id = $1', [req.params.id])
  if (!topic) return res.status(404).send('Topic no encontrado')
  res.render('topics/edit', { topic })
}

const updateTopic = async (req, res) => {
  await pool.query('UPDATE topics SET title = $1, description = $2 WHERE id = $3', [req.body.title, req.body.description, req.params.id])
  res.redirect('/')
}

const deleteTopic = async (req, res) => {
  await pool.query('DELETE FROM topics WHERE id = $1', [req.params.id])
  res.redirect('/')
}

const voteTopic = async (req, res) => {
  const { rows: [topic] } = await pool.query('UPDATE topics SET votes = votes + 1 WHERE id = $1 RETURNING votes', [req.params.id])
  if (!topic) return res.status(404).json({ error: 'Topic no encontrado' })
  res.json({ success: true, votes: topic.votes })
}

// ── LINKS ──

const createLink = async (req, res) => {
  await pool.query('INSERT INTO links (topic_id, title, url) VALUES ($1, $2, $3)', [req.params.id, req.body.title, req.body.url])
  res.redirect(`/topics/${req.params.id}`)
}

const updateLink = async (req, res) => {
  await pool.query('UPDATE links SET title = $1, url = $2 WHERE id = $3 AND topic_id = $4', [req.body.title, req.body.url, req.params.linkId, req.params.id])
  res.redirect(`/topics/${req.params.id}`)
}

const deleteLink = async (req, res) => {
  await pool.query('DELETE FROM links WHERE id = $1 AND topic_id = $2', [req.params.linkId, req.params.id])
  res.redirect(`/topics/${req.params.id}`)
}

const voteLink = async (req, res) => {
  const { rows: [link] } = await pool.query('UPDATE links SET votes = votes + 1 WHERE id = $1 AND topic_id = $2 RETURNING votes', [req.params.linkId, req.params.id])
  if (!link) return res.status(404).json({ error: 'Link no encontrado' })
  res.json({ success: true, votes: link.votes })
}

module.exports = {
  getAllTopics, getNewTopicForm, createTopic, showTopic,
  getEditTopicForm, updateTopic, deleteTopic, voteTopic,
  createLink, updateLink, deleteLink, voteLink
}
