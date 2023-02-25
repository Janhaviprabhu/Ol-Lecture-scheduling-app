const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'instructor',
        required: true
    }
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    batches: [batchSchema]
});



const CourseModel = mongoose.model('Course', courseSchema)

module.exports = { CourseModel }