import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import StarIcon from './StarIcon'
import '../css/StarRating.css'

function CreateRestaurantReview() {

    const [ratingSelected, setRatingSelected] = useState(false);


    const [properties, setProperties] = useState({
        name: "",
        restaurant_name: "",
        rating: 0,
        description: "",
        users: []
    })

    const handleRatingClick = (selectedRating) => {
        setProperties({ 
            ...properties,
            rating: selectedRating
        });
        setRatingSelected(true);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/users/')
                if (response.data.length > 0) {
                    setProperties({
                        users: response.data.map(user => user.username),
                        name: response.data[0].username
                    })
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchData();
    }, [])

    

    async function onSubmit(e) {
        e.preventDefault();
        console.log(properties.name)
        console.log(properties.restaurant_name)
        console.log(properties.rating)
        console.log(properties.description)

        if (!ratingSelected) {
            return;
        }

        const restaurantReview = {
            username: properties.name,
            restaurant_name: properties.restaurant_name,
            rating: properties.rating,
            description: properties.description
        }

        try {
            await axios.post('http://localhost:5000/restaurants/add', restaurantReview)
            window.location = '/'
        } catch (err) {
            console.err(err)
        }
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Username</Form.Label>
                    <Form.Select aria-label="Default select example"
                        required
                        value={properties.name}
                        onChange={(e) => setProperties({
                            ...properties,
                            name: e.target.value
                        })}>
                        {properties.users.map((user) => {
                            return <option
                                key={user}
                                value={user}>{user}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Restaurant Name</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={properties.restaurant_name}
                        onChange={(e) => setProperties({
                            ...properties,
                            restaurant_name: e.target.value
                        })} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Rating</Form.Label>
                    <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                className="star-button"
                                onClick={() => handleRatingClick(value)}
                            >
                                <StarIcon filled={value <= properties.rating} />
                            </button>
                        ))}
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    required
                    value={properties.description}
                    onChange={(e) => setProperties({
                        ...properties,
                        description: e.target.value
                    })}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateRestaurantReview;