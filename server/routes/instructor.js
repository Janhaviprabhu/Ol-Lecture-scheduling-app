const { Router } = require('express');
const { CourseModel } = require('../models/course');
const InstructorRouter = Router()

InstructorRouter.get('/lectures', async (req, res) => {
    try {
        // Get the ID of the logged-in instructor
        const instructorId = req.query.id
        console.log(instructorId);

        // Find all the courses assigned to the instructor
        const courses = await CourseModel.find({ 'batches.instructor': instructorId });

        // // Extract the batches assigned to the instructor
        // const batches = courses.reduce((acc, course) => {
        //     const courseBatches = course.batches.filter((batch) => batch.instructor.toString() === instructorId);
        //     return acc.concat(courseBatches.map((batch) => ({ date: batch.date, courseId: course._id, courseName: course.name })));
        // }, []);

        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = { InstructorRouter }