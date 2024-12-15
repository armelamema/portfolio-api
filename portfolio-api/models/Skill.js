const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Frontend', 'Backend', 'Design', 'Tools', 'Other']
    },
    proficiency: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Skill', skillSchema);
