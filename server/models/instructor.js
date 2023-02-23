const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const InstructorModel=mongoose.model('instructor',instructorSchema)

module.exports={InstructorModel}