import express from "express"
import cors from "cors" // what is this

import dotenv from 'dotenv' // need to look up
import mongoose from 'mongoose'
import bodyParser from "body-parser"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import restaurantRoutes from "./routes/restaurantRoutes.js"
import userRoutes from "./routes/userRoutes.js"


// CONFIGURATION
dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// ROUTES

app.use('/restaurants', restaurantRoutes)
app.use('/users', userRoutes)
app.use(notFound)
app.use(errorHandler)


// MONGOOSE SETUP
const uri = process.env.ATLAS_URI
const port = process.env.PORT || 5000;
main().catch(err => console.log(err));


async function main() {
    try {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(port, () => console.log(`Server Port: ${port}`))
    } catch (err) {
        console.log(`${err} did not connect`)
    }
}
