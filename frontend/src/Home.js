import React from 'react';
import { Button } from 'reactstrap';

// display home page
function Home () {
    return(
        <div>
            <h3>Welcome to My Sheet Music!</h3>
            <p>Login or Sign Up to manage your personal sheet music library.</p>
            <Button href="/signup">Sign Up</Button><br/><br/>
            <Button href="/login">Login</Button>
        </div>
    )
}

export default Home;