import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import StarIcon from './StarIcon'
import '../css/StarRating.css'

function EditRestaurantReview(props) {
    const {id } = useParams();


    const [properties, setProperties] = useState({
        name: "",
        restaurant_name: "",
        rating: 0,
        description: "",
        users: []
    })

    useEffect(() => {
        axios.get('http://localhost:5000/restaurants/' + id).then((res) => {
            setProperties(prevState => ({
                ...prevState,
                name: res.data.username,
                restaurant_name: res.data.restaurant_name,
                rating: res.data.rating,
                description: res.data.description,
            }));
        }).catch((err) => {
            console.err(err)
        })
        
        axios.get('http://localhost:5000/users/')
            .then((res) => {
                if (res.data.length > 0) {
                    setProperties(prevState => ({
                        ...prevState,
                        users: res.data.map(user => user.username),
                    }));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    
    }, [id]);

    const handleRatingClick = (selectedRating) => {
        setProperties({
            ...properties,
            rating: selectedRating
        });
    };

    async function onSubmit(e) {
        e.preventDefault();

        const restaurantReview = {
            username: properties.name,
            restaurant_name: properties.restaurant_name,
            rating: properties.rating,
            description: properties.description
        }

        try {
            await axios.post('http:localhost:5000/restaurants/add', restaurantReview)
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
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditRestaurantReview