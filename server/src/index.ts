import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import userRoutes from "./routes/userRoute"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(cors())

app.use("/users", userRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})