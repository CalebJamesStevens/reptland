import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function Community() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [community, setCommunity] = useState(null);
    const {communityName} = useParams();

    const fetchCommunity = async () => {
        fetch(`/communities/view/${communityName}`)
            .then(res => res.json())
            .then(data => {
                console.log('fetched')
                setCommunity(data)
            })
        
    }

    useEffect(() => {
        console.log('fetching post')
        fetchCommunity();

    },[currentUser]);

    const communityHTML = (
        <>
            <form action={`/communities/${community?.name}/join-community`} method="POST">
                <input type="hidden" name="communityID" value={community?._id}/>
                <input type="submit" value="Join Community"/>
            </form>
        </>
    )

    return (
        <div>
            <h2>Community:</h2>
            {community ? communityHTML : <></>}
            
        </div>
    );
}

export default Community;