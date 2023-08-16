import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from './components/navbar.component'
import CreateUser from "./components/create-user.component";
import RestaurantReviewList from "./components/restaurant-review-list";
import CreateRestaurantReview from "./components/create-restaurant-review";
import EditRestaurantReview from "./components/edit-restaurant-review";

function App() {

  return (
    <Router>
      <div className='container'>
        <NavbarComponent />
        <br />
        <Routes>
          <Route path="/" element={<RestaurantReviewList />} />
          <Route path="/user" element={<CreateUser />} />
          <Route path="/create" element={<CreateRestaurantReview />} />
          <Route path="/edit/:id" element={<EditRestaurantReview />} />
        </Routes>
      </div>
    </Router>

  )
}

export default App
