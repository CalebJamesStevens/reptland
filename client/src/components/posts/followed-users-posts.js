import {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Post from './post'
import PostPreview from './post-preview';
function FollowedUsersPost() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [posts, setPosts] = useState();
    const navigate = useNavigate();

    const fetchCommunityPosts = async () => {
        await currentUser?.followedUsers.forEach(user => {
            fetch(`/api/users/${user}/user-posts`)
                .then(res => res.json())
                .then(data => {
                    data.forEach (post => {
                        setPosts(current => [...current, <PostPreview key={post} postID={post}/>])
                    })
                })
        });
    }

    const test = async (print, wait) => {
        setTimeout(() => {
            console.log(print)
        }, wait)
    }

    useEffect(() => {
        if(posts) return;
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
            navigate('/users/sign-in')
        }

    },[]);

    return (
        <div>
            {posts && posts}
        </div>
    );
}

export default FollowedUsersPost;