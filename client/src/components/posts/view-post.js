import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

import Post from './post'

function ViewPost() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {postID} = useParams();
    const [post, setPost] = useState(postID);
    ;
    useEffect(() => {
        setPost(postID)
    },[]);

    return (
        <div className='view-post-container'>
            <Post postID={post}/>
        </div>
    );
}

export default ViewPost;