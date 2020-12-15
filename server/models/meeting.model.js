const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema({

    title: { type: String, required: [true, 'Title required'] },

    date: Date,

    time: String,

    image: { type: String, default: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },

    description: { type: String, maxlength: 500 },

    type: {
        type: [String],
        enum: ['Beers', 'Party', 'Cultural', 'Languages', 'Music', 'Sports', 'Other'],
        required: [true, 'Specify your plan.']
    },

    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },

    address: String,

    city: { type: String },

    owner: { type: Schema.Types.ObjectId, ref: 'User' },

    assistants: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    comments: [{
        name: { type: Schema.Types.ObjectId, ref: 'User' },
        message: String,
        updated: { type: Date, default: Date.now },
    }]
}, {
    timestamps: true
})

meetingSchema.index({ location: '2dsphere' })

const Meeting = mongoose.model('Meeting', meetingSchema)
module.exports = Meeting