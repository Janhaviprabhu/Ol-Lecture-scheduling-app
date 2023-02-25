const express = require("express")
const cors = require('cors')
const { InstructorModel } = require("./models/instructor")
const { Connection } = require("./config/db")
const { AdminRouter } = require("./routes/admin")
const { InstructorRouter } = require("./routes/instructor")
const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('hello')
})

//signup route
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const checkUser = await InstructorModel.findOne({ email })

    try {
        if (checkUser) {
            res.send("Email already exist , Try using diffrent email")
        } else {
            const user = await new InstructorModel({ name, email, password })
            user.save()
            res.send("Sign up Successfully!!")
        }
    }
    catch (err) {
        console.log(err)
        res.send("Something went wrong, pls try again later")
    }
})

//login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email == 'admin@gmail.com' && password == 'admin123') {
            res.status(200).send({ message: "User Logged in as Admin" })
        }


        else {
            const user = await InstructorModel.findOne({ email: email })

            if (user && user.password == password) {
                // if (user.email === email) {
                //     res.status(200).send({ message: "User Logged in Succefully!!" });
                // } else {
                //     res.status(401).send({ message: "Incorrect! Enter correct credentials!!" });
                // }
                res.status(200).send({ message: "User Logged in Succefully!!",id:user._id });
            }
            else if (user.password != password) {
                res.status(401).send({ message: "Incorrect! Enter correct credentials!!" });
            }
            else {
                res.status(405).send({ message: "User not found with this email, need to register!" });

            }

        }


    } catch (err) {
        console.log(err)
        res.send("Something went wrong, pls try again later")
    }
})

app.use('/admin', AdminRouter)
app.use('/instructor', InstructorRouter)

app.listen(PORT, async () => {
    try {
        await Connection
        console.log("connection to DB successfull")
    }
    catch (err) {
        console.log("error in connecting to DB");
        console.log(err)
    }
    console.log(`listening to port http://localhost:${PORT}`);
})