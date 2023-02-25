const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    password: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]


});

const InstructorModel=mongoose.model('instructor',instructorSchema)

module.exports={InstructorModel}