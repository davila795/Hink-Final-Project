const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const { checkId } = require('../middlewares/middleware')


router.get('/profile/:id', checkId, (req, res) => {

    User
        .findById(req.params.id)
        .populate({ path: 'contacts', select: ['fullname', 'avatar'] })
        .populate({ path: 'attending', select: ['title', 'image'] })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editProfile/:user_id', (req, res) => {

    User
        .findByIdAndUpdate(req.params.user_id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteProfile/:user_id', (req, res) => {

    User
        .findByIdAndDelete(req.params.user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/addMeeting/:user_id/:meeting_id', (req, res) => {

    User
        .findByIdAndUpdate(req.params.user_id, { $push: { attending: req.params.meeting_id } }, { new: true })
        .then(meeting => res.json(meeting))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteMeeting/:user_id/:meeting_id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.user_id, { $pull: { attending: req.params.meeting_id } }, { new: true })
        .then(meeting => res.json(meeting))
        .catch(err => res.status(500).json(err))
})

router.put('/addContact/:user_id/:contact_id', (req, res) => {

    User
        .findByIdAndUpdate(req.params.user_id, { $push: { contacts: req.params.contact_id } }, { new: true })
        .then(contact => res.json(contact))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteContact/:user_id/:contact_id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.user_id, { $pull: { contacts: req.params.contact_id } })
        .then(contact => res.json(contact))
        .catch(err => res.status(500).json(err))
})

module.exports = router