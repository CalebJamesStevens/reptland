import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import Post from './post'
import PostPreview from './post-preview';
function HomePosts() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [posts, setPosts] = useState();

    const fetchCommunityPosts = async () => {
        await currentUser?.communities.forEach(community => {
            fetch(`/api/communities/view/${community}`)
                .then(res => res.json())
                .then(data => {
                    data.posts.forEach (post => {
                        setPosts(current => [...current, <PostPreview key={post} postID={post}/>])
                    })
                })
        });
    }

    const fetchPopularPosts = async () => {
        await fetch(`/api/posts/popular-posts`)
            .then(res => res.json())
            .then(data => {
                data.forEach (post => {
                    setPosts(current => [...current, <PostPreview key={post._id} postID={post._id}/>])
                })
            })
    }

    const test = async (print, wait) => {
        setTimeout(() => {
            console.log(print)
        }, wait)
    }

    useEffect(() => {
        setPosts(new Array())
        if (currentUser) {
            fetch(`/api/users/getEnrichedPosts`)
                .then(res => res.json())
                .then(async posts => {
                    await setCurrentUser({...currentUser, enrichedPosts: posts})
                    console.log(currentUser)
                })
                .then(fetchCommunityPosts())
        } else {
            console.log('hey')
            fetchPopularPosts();
        }

    },[]);

    return (
        <div>
            {posts && posts}
        </div>
    );
}

export default HomePosts;