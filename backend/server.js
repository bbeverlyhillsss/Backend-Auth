import app from "./app.js";
import {PORT} from './config/env.js'
import connectToDataBase from "./config/database.js";

const startApplication = async () => {
    try {
        await connectToDataBase()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log('Error starting server', error)
        process.exit(1)
    }
    
}

startApplication()