var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({

    name: {
        type: String,
        required: true,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 100
    },
    CPDObjects: [{
        type: Schema.Types.ObjectId,
        ref: 'CPDObject'
    }]
});


//Export model
module.exports = mongoose.model('User', UserSchema);