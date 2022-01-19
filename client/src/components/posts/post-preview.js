import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import HeartIcon from '../icons/heart-icon'
import CommentIcon from '../icons/comment-icon'
import LinkIcon from '../icons/link-icon'
import ProfileIcon from '../icons/profile-icon';
import { useNavigate } from 'react-router-dom';

function PostPreview({postID}) {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [post, setPost] = useState();
    const [enrichedPost, setEnrichedPost] = useState();
    const [comments, setComments] = useState(new Array(``));
    
    const navigate = useNavigate();

    const likePost = () => {
        fetch(`/posts/${postID}/enrich-post`)
        .then(res => res.json())
        .then(data => {
            setEnrichedPost(current => !current)
        })
    }

    const fetchPost = async () => {
        await fetch(`/posts/view-post/${postID}`)
            .then(res => res.json())
            .then(data => {
                console.log('456456456',data);
                setPost(data)
                
            })
    }

    useEffect(() => {
        fetchPost();
    },[]);

    useEffect(() => {
        const checkIfEnriched = async () => {
            if (currentUser) {
                console.log('checking enrichment')
                if (currentUser?.enrichedPosts.includes(post?._id)) {
                    console.log('this post is enriched')
                    console.log(currentUser)
                     setEnrichedPost(true)
                } else {
                    console.log('this post is not enriched')
                    setEnrichedPost(false)
                }
            } else {
                console.log('no user')
                setEnrichedPost(false)
            }
        }
        checkIfEnriched()
        
    },[post, currentUser])

    return (
        <div onClick={() => {navigate(`/posts/view-post/${post?._id}`)}} className='post-container clickable'>
            <div className='post-user-info'>
                <ProfileIcon/>
                <div>
                         
                    <div className='clickable' onClick={() => navigate(`/users/${post?.authorID.username}/profile`)}>
                        {post?.authorID.username}
                    </div>
                    <div className='clickable' onClick={() => navigate(`/communities/view/${post?.community?.name}`)}>
                        {post?.community?.name}
                    </div>
                        
                </div>
            </div>
            <div className='post-title'>{post?.title}</div>
            <div className='post-preview-body'>{post?.body}</div>
            <div className='post-interaction-icon-container'>
                <div onClick={() => {likePost()}}
                className={`${enrichedPost && 'filled'} clickable hover-style-1 heart-interactable`}>
                    <HeartIcon/>
                </div>
                <div className='clickable hover-style-1 comment-interactable'><CommentIcon/></div>
                <div className='clickable hover-style-1 link-interactable'><LinkIcon/></div>
            </div>
            
        </div>
    );
}


export default PostPreview;