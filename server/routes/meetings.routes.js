const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Meeting = require('../models/meeting.model')


router.get('/', (req, res) => {

    Meeting
        .find()
        .populate('owner')
        .populate('assistants')
        .populate('comments.owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getMeeting/:id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Meeting
        .findById(req.params.id)
        .populate('owner')
        .populate('assistants')
        .populate('comments.owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newMeeting', (req, res) => {

    Meeting
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editMeeting/:id', (req, res) => {

    Meeting
        .findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteMeeting/:id', (req, res) => {
    Meeting
        .findByIdAndDelete(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(500).json(err))
})

router.put('/addAssistant/:id', (req, res) => {

    Meeting
        .findByIdAndUpdate(req.params.id, { $push: { assistants: req.user.id } })
        .then(meeting => res.json(meeting))
        .catch(err => res.status(500).json(err))
})


module.exports = router