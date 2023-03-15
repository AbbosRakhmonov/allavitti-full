const express = require('express')
const {
    createArticle,
    deleteArticle,
    getArticle,
    getArticles,
    updateArticle
} = require('../controllers/article')

const router = express.Router()

const {protect} = require('../middleware/auth')

router.route('/').post(protect, createArticle).get(getArticles)
router.route('/:id').get(getArticle).put(protect, updateArticle).delete(protect, deleteArticle)

module.exports = router