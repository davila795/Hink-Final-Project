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

    avatar: { type: String, default: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png' },

    password: String,

    description: { type: String, maxlength: 420 },

    origin: String,

    city: String,

    contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    // my_mettings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],

    attending: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User