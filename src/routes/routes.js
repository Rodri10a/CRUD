const express = require('express')
const router = express.Router()

const {
  getAllTopics, getNewTopicForm, createTopic, showTopic,
  getEditTopicForm, updateTopic, deleteTopic, voteTopic,
  createLink, updateLink, deleteLink, voteLink
} = require('../controllers/controller')

// Topics
router.get('/', getAllTopics)
router.get('/topics/new', getNewTopicForm)
router.post('/topics', createTopic)
router.get('/topics/:id', showTopic)
router.get('/topics/:id/edit', getEditTopicForm)
router.post('/topics/:id/update', updateTopic)
router.post('/topics/:id/delete', deleteTopic)
router.post('/topics/:id/vote', voteTopic)

// Links
router.post('/topics/:id/links', createLink)
router.post('/topics/:id/links/:linkId/update', updateLink)
router.post('/topics/:id/links/:linkId/delete', deleteLink)
router.post('/topics/:id/links/:linkId/vote', voteLink)

module.exports = router
