import express from 'express'
import {
    allReviews,
    createReview,
    restaurantReview,
    updateReview,
    deleteReview
} from '../controllers/restaurantController.js'

const router = express.Router()

router.get("/", allReviews)
router.get('/id', restaurantReview)
router.post('/add', createReview)
router.post('/update/:id', updateReview)
router.delete('/:id', deleteReview)

export default router