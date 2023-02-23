const express = require("express")
const cors = require('cors')
const { UserModel } = require("./models/user")
const { Connection } = require("./config/db")
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
    const checkUser = await UserModel.findOne({ email })
  
    try {
        if (checkUser) {
            res.send("Email already exist , Try using diffrent email")
        }else {
            const user = await new UserModel({ name, email, password })
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
    if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
            if (user.email === email) {
                res.status(200).send({ message: "User Logged in Succefully!!" });
            } else {
                res.status(401).send({ message: "Incorrect! Enter correct password!!" });
            }
        } else {
            res.status(405).send({ message: "User not found with this email, need to register!" });
        }
    }
})



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