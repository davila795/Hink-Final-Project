const express = require('express')
const router = express.Router()
const Meeting = require('../models/meeting.model')
const { checkId } = require('../middlewares/middleware')


router.get('/', (req, res) => {

    Meeting
        .find({}, { title: 1, date: 1, image: 1, time: 1, owner: 1, city: 1, type: 1 })
        .populate('owner', 'username')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getUserMeetings', (req, res) => {

    Meeting
        .find({ owner: req.user._id })
        .populate('owner','username')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


router.get('/getMeeting/:id', checkId, (req, res) => {

    Meeting
        .findById(req.params.id)
        .populate('owner', 'username')
        .populate({ path: 'assistants', select: ['username', 'avatar'] })
        .populate({ path: 'comments.name', select: ['username', 'avatar'] })
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
    const { latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Meeting
        .findByIdAndUpdate(req.params.id, { ...req.body, location }, { new: true })
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
        .findByIdAndUpdate(req.params.id, { $push: { assistants: req.user._id } }, { new: true })
        .then(meeting => res.json(meeting))
        .catch(err => res.status(500).json(err))
})

router.put('/addComment/:id', (req, res) => {

    Meeting
        .findByIdAndUpdate(req.params.id, { $push: { comments: req.body } }, { new: true })
        .then(meeting => res.json(meeting))
        .catch(err => res.status(500).json(err))
})


module.exports = router