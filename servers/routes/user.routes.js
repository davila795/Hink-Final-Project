const { response } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user.model')


router.get('/profile/:id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    User
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editProfile', (req, res) => {

    User
        .findByIdAndUpdate(req.user.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteProfile', (req, res) => {

    User
        .findByIdAndDelete(req.user.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/addMeeting/:id', (req, res) => {

    User
        .findByIdAndUpdate(req.user.id, { $push: { attending: req.params.id } })
        .then(meeting => res.json(meeting))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteMeeting/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.user.id, { $pull: { attending: req.params.id } })
        .then(meeting => res.json(meeting))
        .catch(err => res.status(500).json(err))
})

router.put('/addContact/:id', (req, res) => {

    User
        .findByIdAndUpdate(req.user.id, { $push: { contacts: req.params.id } })
        .then(contact => res.json(contact))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteContact/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.user.id, { $pull: { contacts: req.params.id } })
        .then(contact => res.json(contact))
        .catch(err => res.status(500).json(err))
})

module.exports = router