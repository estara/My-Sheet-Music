import React, {  useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import UserLibCard from './UserLibCard';
import MyMusicApi from './api.js';
import { CurrentUserContext, CurrentUserDispatchContext, UserLibContext } from './MyMusicContext';

function User () {
  const currentUser = useContext(CurrentUserContext);
  const setCurrentUser = useContext(CurrentUserDispatchContext);
  const userLib = useContext(UserLibContext);
  const history = useHistory();
  const initialState = {firstName: currentUser.firstName, lastName: currentUser.lastName, email: currentUser.email, password: ""};
  const [formData, setFormData] = useState(initialState);

  // handle user form input before submit
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  // submit updates to user profile
  async function handleSubmit (evt) {
      evt.preventDefault();
      await MyMusicApi.updateUser(currentUser.username, formData);
      setFormData(initialState);
    }

  // delete user upon click
  async function deleteClick (evt) {
    evt.preventDefault();
    await MyMusicApi.deleteUser(currentUser.username);
    localStorage.clear();
    setCurrentUser(null);
    history.push('/');
  }

  return (
    <div>
        <h3>{currentUser.username}'s Library</h3>
        <form onSubmit={handleSubmit}>
                <label for="name">Name</label><br/>
                <input type="text" name="name" placeholder={currentUser.name} onChange={handleChange}/><br/><br/>
                <label for="email">Email</label><br/>
                <input type="text" name="email" placeholder={currentUser.email} onChange={handleChange}/><br/><br/>
                <label for="password">Confirm password to make changes</label><br/>
                <input type="password" name="password" onChange={handleChange}/><br/><br/>
                <button type="submit">Save Changes</button>
            </form><br/>
        <Button onClick={deleteClick} size="sm">Delete User</Button><br/><br/>
        {userLib ? userLib.map(work => (<UserLibCard work={work}/>)) : <div></div>}
    </div>
  )
}

export default User;