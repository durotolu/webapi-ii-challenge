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
    //req.body.post_id = req.params.id;
    console.log(req.body)
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
        Posts.insert(req.body)
            .then(post => {
                //req.body.post_id = req.params.id;
                res.status(201).json(req.body)
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

router

module.exports = router;