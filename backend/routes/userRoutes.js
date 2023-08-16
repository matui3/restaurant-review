import express from 'express'
import {
    getAllUsers,
    getUser,
    registerUser
} from '../controllers/userController.js'

const router = express.Router()

router.get("/", getAllUsers)

router.get("/:id", getUser)

router.post("/add", registerUser)

export default router