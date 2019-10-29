const express = require('express')
const Posts = require('./data/db')

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            success: false,
            errorMessage: "Please provide title and contents for the post."
        })
    } else {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(req.body);
            })
            .catch(error => {
                res.status(500).json(
                    error.message,
                )
            })
    }
})

router.post('/:id/comments', (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            success: false,
            message: "The post with the specified ID does not exist."
        })
    } else if (!req.body.text) {
        res.status(400).json({
            success: false,
            errorMessage: "Please provide text for the comment."
        })
    } else {
        Posts.insertComment(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json(
                    error.message,
                )
            })
    }
})

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json(
                error.message,
            )
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
        .then(post => {
            if(post) {
                res.status(200).json({
                    success: true,
                    post,
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    Posts.findCommentById(id)
        .then(comments => {
            if (!comments) {
                res.status(404).json({
                    success: false,
                    message: "The post with the specified ID does not exist."
                })
            } else {
                res.status(200).json({
                    success: true,
                    comments,
                })
            }
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(comment => {
            if(comment) {
                res.status(200).json({
                    success: true,
                    message: comment,
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The post with the specified ID does not exist.'
                })
            }
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
})

module.exports = router;