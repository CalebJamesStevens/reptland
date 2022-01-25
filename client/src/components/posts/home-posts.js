import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import Post from './post'
import PostPreview from './post-preview';
function HomePosts() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [posts, setPosts] = useState();


    const checkCurrentUser = async () => {
        await setPosts(new Array())
        await fetch('/api/users/currentUser')
        .then(res => res.json())
        .then(data => {
            if (data) {
                fetchCommunityPosts(data)
            } else {
                fetchPopularPosts()
            }
        }) 
    }

    const fetchCommunityPosts = async (data) => {
        data.communities.forEach(community => {
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
        fetch(`/api/posts/popular-posts`)
            .then(res => res.json())
            .then(data => {
                data.forEach (post => {
                    setPosts(current => [...current, <PostPreview key={post._id} postID={post._id}/>])
                })
            })
    }

    const test = async (print, wait) => {
        setTimeout(() => {
            
        }, wait)
    }

    useEffect(() => {
        checkCurrentUser();
    },[]);

    return (
        <div className="home-posts-container">
            {posts && posts}
        </div>
    );
}

export default HomePosts;