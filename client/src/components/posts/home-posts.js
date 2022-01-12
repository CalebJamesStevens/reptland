import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import Post from './post'
function HomePosts() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [posts, setPosts] = useState(new Array());

    const fetchPosts = async () => {
        await currentUser.communities.forEach(community => {
            fetch(`/communities/view/${community}`)
                .then(res => res.json())
                .then(data => {
                    data.posts.forEach (post => {
                        setPosts(current => [...current, <Post key={post} postID={post}/>])
                    })
                })
        });
    }

    useEffect(() => {
        if (!currentUser) return;
        console.log('fetching posts')
        fetchPosts();

    },[currentUser]);

    return (
        <div>
            {posts && posts}
        </div>
    );
}

export default HomePosts;