import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' 

function RestaurantReviewList() {

    const Restaurant = props => (
        <tr>
            <td>{props.restaurant.username}</td>
            <td>{props.restaurant.restaurant_name}</td>
            <td>{props.restaurant.rating}</td>
            <td>{props.restaurant.description}</td>
            <td>
                <Link to={`/edit/${props.restaurant._id}`}>edit</Link> | <a href='/' onClick={() => { props.deleteReview(props.restaurant._id) }}>delete</a>
            </td>
        </tr>
    )

    const [restaurantList, setRestaurantList] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/restaurants')
                setRestaurantList(response.data)
            } catch (error) {
                console.error(error)
            }
        };

        fetchData();
    }, [])

    async function deleteReview(id) {
        await axios.delete('http://localhost:5000/exercises/' + id)
        setRestaurantList(restaurantList.filter(el => el._id !== id))
    }

    function list() {
        return restaurantList.map(restaurant => {
            return <Restaurant restaurant={restaurant} deleteRestaurant={deleteReview} key={restaurant._id} />
        })
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Restaurant Name</th>
                    <th>Rating</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {list()}
            </tbody>
        </Table>
    );
}

RestaurantReviewList.propTypes = {
    restaurant: PropTypes.shape({
        username: PropTypes.string,
        restaurant_name: PropTypes.string,
        rating: PropTypes.number,
        description: PropTypes.string,
        _id: PropTypes.string
    }),
    deleteReview: PropTypes.func,
}

export default RestaurantReviewList;