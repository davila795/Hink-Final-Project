const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    username: { type: String, required: [true, 'Username required'] },

    fullname: String,

    age: Number,

    avatar: { type: String, default: 'https://res.cloudinary.com/davila795/image/upload/v1608147555/Hink-images/roetpubkc7a3iehxqkvg.jpg' },

    password: String,

    description: { type: String, maxlength: 420 },

    origin: String,

    city: String,

    contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    attending: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User