const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const bcryptSalt = 10
const { check, validationResult } = require('express-validator')

const User = require('../models/user.model')

router.post('/signup',
    [
        check('username').isLength({ min: 3 }).withMessage('Name should have min 3 characters.').custom(value => {
            return User.findOne({ username: value }).then(user => {
                if (user) { return Promise.reject('Username in use') }
            })
        }),

        check('email').isEmail().withMessage('Invalid email').custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user) { return Promise.reject('Email in use') }
            })
        }),

        check('password').isLength({ min: 6 }).withMessage('Password min 6 characters').matches(/\d/).withMessage('Password must contain a number')
    ],
    (req, res) => {
        const passCheck = validationResult(req)

        if (!passCheck.isEmpty()) {
            res.status(400).json({ Message: passCheck.errors })
            return
        }
        console.log(req.body)

        const { username, password, email, origin, city, age, fullname, description } = req.body

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)

        User
            .create({ username, password: hashPass, email, origin, city, age, fullname, description })
            .then(newUser => req.login(newUser, err => err ? res.status(500).json({ Message: 'Login error' }) : res.status(200).json(newUser)))
            .catch(err => res.status(500).json({ Message: err }))
    })

router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.status(500).json({ message: 'Error authenticating user' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.logIn(theUser, err => err ? res.status(500).json({ message: 'Session error' }) : res.status(200).json(theUser))

    })(req, res, next)
})

router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Log out success!' });
})

router.get('/loggedin', (req, res) => req.isAuthenticated() ? res.status(200).json(req.user) : res.status(403).json({ message: 'Unauthorized' }))



module.exports = router