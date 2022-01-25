import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function CreateCommunity() {
    const navigate = useNavigate();
    
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [community, setCommunity] = useState(null);

    const checkCurrentUser = () => {
        fetch('/api/users/currentUser')
        .then(res => res.json())
        .then(data => {
            if (!data) {
                navigate('/users/sign-in')
            }
        }) 
    }

    useEffect(() => {
        checkCurrentUser()
    },[]);

    return (
        <div className='create-community-container'>
            <div>Create a community!</div>
            <form className='container-3 create-community-form' action="/api/communities/new-community" method="POST">
                <div className='create-community-form-item'>
                    <label htmlFor="name" id="community-name-form-label">Give your community a unique name!</label>
                    <input className='text-input' type="text" name="name" id="community-name-input-field"/>
                </div>

                <div className='create-community-form-item'>
                    <label htmlFor="description" id="community-description-form-label">Description:</label>
                    <textarea className='create-community-form-description-textarea' type="text" name="description" id="community-description-input-field"/>
                </div>

                <div className='create-community-form-item'>
                    <label htmlFor="topics" id="community-topics-form-label">Topics</label>
                    <input className='text-input' type="text" name="topics" placeholder='Please Seperate By Commas' id="community-topics-input-field"/>
                </div>
                <div className='create-community-form-item'>
                    <label htmlFor="tags" id="community-tags-form-label">Topics</label>
                    
                    <input className='text-input' type="text" name="tags" placeholder='Please Seperate By Commas' id="community-tags-input-field"/>
                </div>
                <input className='button-style-2' type="submit" value="Create"/>
             </form>
        </div>
    );
}

export default CreateCommunity;