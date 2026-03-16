const express = require('express') // creo el servidor 
const router = express.Router() // mini aplicacion de rutas 

const {
  getAllTopics, createTopic, updateTopic, deleteTopic, voteTopic,
  createLink, updateLink, deleteLink, voteLink
} = require('../controllers/controller')

// TOPIC
router.get('/', getAllTopics) 
router.post('/topics', createTopic)
router.post('/topics/:id/update', updateTopic)
router.post('/topics/:id/delete', deleteTopic)
router.post('/topics/:id/vote', voteTopic)

// :id son los parametros de ruta (URL) 

// LINK 
router.post('/topics/:id/links', createLink)
router.post('/topics/:id/links/:linkId/update', updateLink)
router.post('/topics/:id/links/:linkId/delete', deleteLink)
router.post('/topics/:id/links/:linkId/vote', voteLink)

module.exports = router
