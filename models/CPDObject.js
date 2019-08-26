var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CPDPObjectSchema = new Schema({

    title: {
        type: String,
        required: true,
        max: 100
    },
    date_started: {
        type: Date
    },
    date_completed: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Planning', 'In-Work', 'completed', 'On-Hold']
    },
    date_attended: {
        type: Date
    },
    CPD_type: {
        type: String,
        enum: ['Training', 'Work', 'Accademic', 'Volunteering', 'Events', 'Self-Study']
    },
    reference: {
        type: String
    },
    CPD_hours: {
        type: Number
    }
})



//Export model
module.exports = mongoose.model('CPDObject', CPDPObjectSchema);