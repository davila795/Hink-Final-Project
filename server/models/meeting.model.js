const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema({

    title: { type: String, required: [true, 'Title required'] },

    date: {
        type: Date,
        default: Date.now
    },

    time: String,

    image: { type: String, default: 'https://res.cloudinary.com/davila795/image/upload/v1608147459/Hink-images/viqgx33hhauhoinbfd41.jpg' },

    description: { type: String, maxlength: 500 },

    type: {
        type: [String],
        enum: ['Beers', 'Party', 'Cultural', 'Languages', 'Music', 'Sports', 'Other'],
        // required: [true, 'Specify your plan.']
    },

    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [40.450620, - 3.686573]
        }
    },

    address: {
        type: String,
        default: 'Paseo de la Habana, 52, 28036 Madrid, Spain'
    },

    city: {
        type: String,
        default: 'Madrid'
    },

    owner: { type: Schema.Types.ObjectId, ref: 'User', default: '5fd29f116436e7304c4aa166' },

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