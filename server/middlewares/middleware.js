const mongoose = require('mongoose')
module.exports = {
    checkId: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.id) ? res.status(500).send({ message: 'Invalid Id' }) : next()
}