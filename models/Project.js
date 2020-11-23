const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    creatorUser:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },

    dateRegister:{
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Project', ProjectSchema);