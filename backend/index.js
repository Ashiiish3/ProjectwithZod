const express = require("express")
const userRouter = require("./routes/user.routes")
const notesRouter = require("./routes/notes.routes")
const connectWithDB = require("./db/db")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "PUT", "UPDATE", "DELETE"]
}))


app.use("/user", userRouter)
app.use("/notes", notesRouter)


app.listen(5000, async ()=>{
    try {
        console.log("server is running on port 5000")
        console.log("connect with db")
        await connectWithDB;
    } catch (error) {
        console.log("error", error)
    }
})
