const { Router } = require('express');
const { CourseModel } = require('../models/course');
const { InstructorModel } = require('../models/instructor');
const AdminRouter = Router()

AdminRouter.get('/instructors',async(req,res)=>{
    try {
        const instructors = await InstructorModel.find();
        res.send(instructors);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

AdminRouter.post('/courses', async (req, res) => {
    try {
        const { name, level, description, image, batches } = req.body;

        // Check if the instructor is available for the given batch dates
        const instructorIds = batches.map(batch => batch.instructor)
        const instructorAvailability = await CourseModel.find({
            'batches.date': { $in: batches.map(batch => batch.date) },
            'batches.instructor': { $in: instructorIds }
        });

        if (instructorAvailability.length > 0) {
            return res.status(400).json({
                message: 'One or more instructors are not available on the given batch dates'
            });
        }

        const course = new CourseModel({ name, level, description, image, batches });

        // Assign the course dates to the instructors
        for (let i = 0; i < batches.length; i++) {
            const instructor = await InstructorModel.findById(batches[i].instructor);

            if (!instructor) {
                return res.status(400).json({
                    message: `Instructor with ID ${batches[i].instructor} not found`
                });
            }

            const existingCourse = await CourseModel.findOne({
                'batches.date': batches[i].date,
                'batches.instructor': batches[i].instructor
            });

            if (existingCourse) {
                return res.status(400).json({
                    message: `Instructor ${instructor.name} is already assigned to another course on ${batches[i].date}`
                });
            }

            instructor.courses.push(course._id);
            await instructor.save();
        }

        await course.save();
        res.send(course);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = { AdminRouter }