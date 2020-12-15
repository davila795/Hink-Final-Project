const express = require('express')
const router = express.Router()
const Meeting = require('../models/meeting.model')
const checkId = require('../middlewares/middleware')


router.get('/', (req, res) => {

    Meeting
        .find()
        .populate('owner')
        .populate('assistants')
        .populate('comments.name')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getUserMeetings', (req, res) => {

    Meeting
        .find({ owner: req.user.id })
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


router.get('/getMeeting/:id', checkId, (req, res) => {

    Meeting
        .findById(req.params.id)
        .populate('owner')
        .populate('assistants')
        .populate('comments.name')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newMeeting', (req, res) => {

    const { latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Meeting
        .create({ ...req.body, location })
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

router.put('/addComment/:id', (req, res) => {

    Meeting
        .findByIdAndUpdate(req.params.id, { $push: { comments: req.body } })
        .then(event => res.json(event))
        .catch(err => res.status(500).json(err))
})


module.exports = router