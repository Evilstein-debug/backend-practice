import 'dotenv/config'
import connectDB from "./db/index.js";
import app from './app.js';

const port = process.env.PORT || 8000

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error in express application: ", error)
        throw error
    })
    app.listen(port, () => {
        console.log(`app listening on port: ${port}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection error!", error)
})




/*
(async () => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error", (error) => {
        console.log("Error: ", error)
        throw error
       })
       app.listen(process.env.PORT, () => {
        console.log(`App is listening on port: ${process.env.PORT}`)
       })
    }
    catch(error){
        console.error("Error: ", error)
        throw error
    }
})()
*/