const { Router } = require('express');
const { CourseModel } = require('../models/course');
const InstructorRouter = Router()

InstructorRouter.get('/:instructorId/courses', async (req, res) => {
    try {
        const courses = await CourseModel.find({ 'batches.instructor': req.params.instructorId })
            .populate('batches.instructor', 'name')
            .select('name batches.date');

        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports={InstructorRouter}