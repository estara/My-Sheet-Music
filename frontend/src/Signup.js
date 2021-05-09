import React, { useState } from 'react';
import { Form, FormGroup, Button, Input } from 'reactstrap';

function Signup ({ signup }) {
    const initialState = {username: "", name: "", password: "", email: ""}
    const [formData, setFormData] = useState(initialState)

    // handle user form input before submit
    function handleChange (evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({
          ...fData,
          [name]: value
        }));
    }
    
    // handle form submission
    async function handleSubmit (evt) {
        evt.preventDefault();
        try{
        await signup(formData);
        setFormData(initialState);
        } catch (err) {
            return( <p>Error, please try again.</p>)
        }
    }


    // display signup form
    return (
        <div>
            <h2>Sign up for updates about our company!</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input type="text" name="username" placeholder="Username" onChange={handleChange} required></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="name" placeholder="Name" onChange={handleChange} required></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="email" placeholder="Email" onChange={handleChange} required></Input>
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" placeholder="Password" onChange={handleChange} required></Input>
                </FormGroup>
                <Button>Sign up</Button>
            </Form>
        </div>
    )
}

export default Signup;