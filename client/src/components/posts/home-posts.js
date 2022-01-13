import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import Post from './post'
import PostPreview from './post-preview';
function HomePosts() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [posts, setPosts] = useState(new Array());

    const fetchCommunityPosts = async () => {
        await currentUser?.communities.forEach(community => {
            fetch(`/communities/view/${community}`)
                .then(res => res.json())
                .then(data => {
                    data.posts.forEach (post => {
                        setPosts(current => [...current, <PostPreview key={post} postID={post}/>])
                    })
                })
        });
    }

    const fetchPopularPosts = async () => {
        fetch(`/posts/popular-posts`)
            .then(res => res.json())
            .then(data => {
                data.forEach (post => {
                    console.log(post)
                    setPosts(current => [...current, <PostPreview key={post._id} postID={post._id}/>])
                })
            })
    }

    useEffect(() => {
        setPosts(new Array())
        if (!currentUser) {
            console.log('no user')
            fetchPopularPosts();
            return;
        } else {
            console.log('fetching posts')
            fetchCommunityPosts();
        }

    },[currentUser]);

    return (
        <div>
            {posts && posts}
        </div>
    );
}

export default HomePosts;