import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import Post from './post'
import PostPreview from './post-preview';
import PopularIcon from '../icons/popular-icon' 

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

    const fetchEnrichedPosts = async () => {
        if (!currentUser) return;
        await setPosts(new Array())
        fetch(`/api/users/getEnrichedPosts`)
                .then(res => res.json())
                .then(posts => {
                    setCurrentUser({...currentUser, enrichedPosts: posts})
                    
                })
    }

    const fetchCommunityPosts = async (data) => {
        data.communities.forEach(community => {
            fetch(`/api/communities/view/${community}`)
                .then(res => res.json())
                .then(data => {
                    data.posts.forEach (post => {
                        setPosts(current => [...current, post])
                    })
                })
                .then(setPosts(current => current.sort((a, b) => a.enrichment - b.enrichment)))

        });
    }

    const fetchPopularPosts = async () => {
        fetch(`/api/posts/popular-posts`)
            .then(res => res.json())
            .then(data => {
                data.forEach (post => {
                    setPosts(current => [...current, post._id])
                })
            })
            .then(setPosts(current => current.sort((a, b) => a.enrichment - b.enrichment)))
    }

    const test = async (print, wait) => {
        setTimeout(() => {
            
        }, wait)
    }

    useEffect(() => {
        checkCurrentUser();
        fetchEnrichedPosts()
    },[]);

    return (
        <div className="home-posts-container">
            {posts && posts.map(post => {
                return (
                    <PostPreview key={post} postID={post}/>
                )
            })}

            {posts?.length <= 0 && (
                    <div class="no-home-posts">
                        Looks like you haven't joined
                        any communities yet! Check out the
                        popular <PopularIcon/> page to find your people!
                    </div>
                
            )}
        </div>
    );
}

export default HomePosts;