import express from "express"
import authRouter from "./routes/auth.router.js"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/error.middleware.js"

const app = express()

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRouter)

app.use(errorMiddleware)

export default app