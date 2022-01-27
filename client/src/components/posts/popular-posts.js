import {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Post from './post'
import PostPreview from './post-preview';
function PopularPosts() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [posts, setPosts] = useState();
    const navigate = useNavigate();

    const fetchPopularPosts = async () => {
        await setPosts(new Array())
        fetch(`/api/posts/popular-posts`)
            .then(res => res.json())
            .then(data => {
                data.forEach (post => {
                    console.log(post)
                    setPosts(current => [...current, post])
                })
            })
    
    }

    const checkCurrentUser = async () => {
        await setPosts(new Array())
        await fetch('/api/users/currentUser')
        .then(res => res.json())
        .then(data => {
            if (data) {
                fetchPopularPosts()
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
        //checkCurrentUser();
        fetchPopularPosts()
        fetchEnrichedPosts()
    },[]);

    return (
        <div>
            {posts && posts?.map(post => {
                return (
                    <PostPreview key={post._id} postID={post._id}/>
                )
            })}
        </div>
    );
}

export default PopularPosts;