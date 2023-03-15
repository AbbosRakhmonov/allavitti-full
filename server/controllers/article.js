const asyncHandler = require('../middleware/async')
const Article = require('../models/Article')
const fs = require('fs')
const ErrorResponse = require('../utils/errorResponse')

// @desc      Register article
// @route     POST /api/v1/article
// @access    Private
exports.createArticle = asyncHandler(async (req, res, next) => {
    const {title, description} = req.body
    const article = await Article.create({
        title,
        description
    })

    res.status(200).json({
        success: true,
        data: article
    })
})

// @desc      Get all articles
// @route     GET /api/v1/article
// @access    Public
exports.getArticles = asyncHandler(async (req, res, next) => {
    const articles = await Article.find()
    res.status(200).json({
        success: true,
        data: articles
    })
})

// @desc      Get single article
// @route     GET /api/v1/article/:id
// @access    Public
exports.getArticle = asyncHandler(async (req, res, next) => {
    const article = await Article.findById(req.params.id)

    if (!article) {
        return next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        data: article
    })
})

// @desc      Update article
// @route     PUT /api/v1/article/:id
// @access    Private
exports.updateArticle = asyncHandler(async (req, res, next) => {
    const {title, description} = req.body
    const article = await Article.findByIdAndUpdate(req.params.id, {
        title,
        description
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: article
    })
})

// @desc      Delete article
// @route     DELETE /api/v1/article/:id
// @access    Private
exports.deleteArticle = asyncHandler(async (req, res, next) => {
    const article = await Article.findById(req.params.id)

    if (!article) {
        return next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404))
    }

    article.remove()

    res.status(200).json({
        success: true,
        data: {}
    })
})