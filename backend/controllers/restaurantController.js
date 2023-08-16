import asyncHandler from "express-async-handler";
import Restaurant from "../models/restaurantModel.js"
import mongoose from "mongoose";

// CREATE RESTAURANT LISTING

export const createReview = asyncHandler( async (req, res) => {
    const {username, restaurant_name, rating, description } = req.body
    
    let emptyFields = []

    if (!username) {
        emptyFields.push('username')
    }
    if (!restaurant_name) {
        emptyFields.push('restaurant name')
    }
    if (!rating) {
        emptyFields.push('rating')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    
    try {
        const restaurant = await Restaurant.create({
            username,
            restaurant_name,
            rating,
            description
        })

        const newRestaurant = await restaurant.save()

        res.status(200).json('Restaurant Review published!')
    } catch (error) {
        res.status(400).json({ error: 'Restaurant review unable to be published' })
    }
    
})

// get all reviews

export const allReviews = asyncHandler( async (req, res) => {
    const reviews = await Restaurant.find({}).sort({ createdAt: -1 })

    res.status(200).json(reviews)
})

// grab a single review

export const restaurantReview = asyncHandler( async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such review' })
    }

    const review = await Restaurant.findById(id)

    if (!review) {
        return res.status(404).json({ error: 'No such review'})
    }

    res.status(200).json(review)
})

export const updateReview = asyncHandler( async (req, res) => {
    
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such review'})
    }

    const review = await Restaurant.findOneAndUpdate({ _id: id}, {
        ...req.body
    })

    if (!review) {
        return res.status(400).json({ error: 'No such review'})
    }

    res.status(200).json(review)

})

export const deleteReview = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such review' })
    }

    const review = await Restaurant.findOneAndDelete({ _id: id })

    if (!review) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(review)

})