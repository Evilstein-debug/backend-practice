import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN, //cors origin currently set to * but in real use cases we set it to our fronted url.
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js' //custom name can be given to an import only if it's a default export

//routes declaration
app.use("/api/v1/users", userRouter)

export default app