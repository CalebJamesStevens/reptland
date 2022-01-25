import {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Post from './post'
import PostPreview from './post-preview';
function FollowedUsersPost() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [posts, setPosts] = useState();
    const navigate = useNavigate();

    const fetchFriendsPosts = async (data) => {
        
       await data.followedUsers.forEach(user => {
            fetch(`/api/users/${user}/user-posts`)
                .then(res => res.json())
                .then(data => {
                    data.forEach (post => {
                        setPosts(current => [...current, post])
                    })
                })
        });
    }

    const checkCurrentUser = async () => {
        await setPosts(new Array())
        await fetch('/api/users/currentUser')
        .then(res => res.json())
        .then(data => {
            if (data) {
                fetchFriendsPosts(data)
            } else {
                navigate('/users/sign-in')
            }
        })
    }

    const fetchEnrichedPosts = async () => {
        if (!currentUser) return;
        await setPosts(new Array())
        fetch(`/api/users/getEnrichedPosts`)
                .then(res => res.json())
                .then(posts => {
                    setCurrentUser({...currentUser, enrichedPosts: posts})
                    
                })
    }

    useEffect(() => {
        checkCurrentUser();
        fetchEnrichedPosts()
    },[]);

    return (
        <div>
            {posts && posts.map(post => {
                return (
                    <PostPreview key={post} postID={post}/>
                )
            })}
        </div>
    );
}

export default FollowedUsersPost;