import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';

function Post({postID}) {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        fetch(`/posts/view-post/${postID}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data)
            })
        
    }

    useEffect(() => {
        console.log('fetching post')
        fetchPost();

    },[currentUser]);

    return (
        <div>
            <h2>Post:</h2>
            {post && post.title}
        </div>
    );
}

export default Post;