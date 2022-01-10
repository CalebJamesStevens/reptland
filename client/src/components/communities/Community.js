import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';

function Community({communityName}) {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [community, setCommunity] = useState(null);

    const fetchCommunity = async () => {
        fetch(`/communities/view/${communityName}`)
            .then(res => res.json())
            .then(data => {
                setCommunity(data)
            })
        
    }

    useEffect(() => {
        console.log('fetching post')
        fetchCommunity();

    },[currentUser]);

    return (
        <div>
            <h2>Community:</h2>
            {community && community.name}
        </div>
    );
}

export default Community;