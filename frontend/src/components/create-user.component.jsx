import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'


function CreateUser() {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    })

    const submitHandler = async (e) => {
        e.preventDefault();

        const user = {
            username: loginInfo.username,
            password: loginInfo.password
        }
        
        try {
            await axios.post('http://localhost:5000/users/add', user)
        } catch (err) {
            console.err(err)
        }
        setLoginInfo({
            username: "",
            password: ""
        })
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="username"
                    placeholder="Enter username"
                    value={loginInfo.username}
                    onChange={(e) => setLoginInfo({
                        ...loginInfo,
                        username: e.target.value
                    })} />
                <Form.Text className="text-muted">
                    We'll never share your username/password with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={loginInfo.password}
                    onChange={(e) => setLoginInfo({
                        ...loginInfo,
                        password: e.target.value
                    })} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default CreateUser;