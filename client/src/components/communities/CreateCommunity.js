import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function CreateCommunity() {
    const navigate = useNavigate();
    
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [community, setCommunity] = useState(null);

    useEffect(() => {
        if (!currentUser) {
            navigate('/users/sign-in')
            return;
        };
    },[currentUser]);

    return (
        <div>
            <form action="/api/communities/new-community" method="POST">
                <div>
                    <label htmlFor="name" id="community-name-form-label">Name</label>
                    <input type="text" name="name" id="community-name-input-field"/>
                </div>

                <div>
                    <label htmlFor="description" id="community-description-form-label">Description</label>
                    <input type="text" name="description" id="community-description-input-field"/>
                </div>

                <div>
                    <label htmlFor="topics" id="community-topics-form-label">Topics</label>
                    <div>Please Seperate By Commas</div>
                    <input type="text" name="topics" id="community-topics-input-field"/>
                </div>
                <div>
                    <label htmlFor="tags" id="community-tags-form-label">Topics</label>
                    <div>Please Seperate By Commas</div>
                    <input type="text" name="tags" id="community-tags-input-field"/>
                </div>
                <input type="submit" value="Create"/>
             </form>
        </div>
    );
}

export default CreateCommunity;