import mongoose from "mongoose"
import { DB_URI, NODE_ENV } from './env.js'

if (!DB_URI) {
    throw new Error("Define the MONGODB_URL")
}

const connectToDataBase = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log(`Connected to DataBase in ${NODE_ENV} mode.`)
    } catch (error) {
        console.log("Error connecting to DataBase", error)
        process.exit(1)
    }
}
export default connectToDataBase