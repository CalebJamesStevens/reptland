import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function UserProfile() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {username} = useParams();
    const [user, setUser] = useState(null);


    const findUser = () => {
        fetch(`/users/${username}/profile`)
            .then(res => res.json())
            .then (data => {
                setUser(data);
            })
    }

    useEffect(() => {
        findUser()
    },[]);

    return (
        <div>
            <h2>{user && user.username}</h2>
        </div>
    );
}

export default UserProfile;