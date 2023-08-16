import mongoose from 'mongoose'
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    restaurant_name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export default Restaurant