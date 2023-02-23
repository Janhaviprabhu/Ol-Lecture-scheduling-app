const mongoose = require('mongoose');

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
    batches: [{
        date: {
            type: Date,
            required: true
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instructor',
            required: true
        }
    }]
});

const CourseModel = mongoose.model('Course', courseSchema)

module.exports={CourseModel}