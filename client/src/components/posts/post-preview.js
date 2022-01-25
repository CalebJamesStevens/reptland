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
    const [author, setAuthor] = useState();
    
    const navigate = useNavigate();

    const likePost = () => {
        fetch(`/api/posts/${postID}/enrich-post`)
        .then(res => res.json())
        .then(data => {
            setEnrichedPost(current => !current)
        })
    }

    const fetchPost = async () => {
        await fetch(`/api/posts/view-post/${postID}`)
            .then(res => res.json())
            .then(data => {
                fetch(`/api/users/${data?.authorID}/info?username=true&id=true`)
                    .then(res => res.json())
                    .then(auth => {
                        setAuthor(auth)
                    })
                setPost(data)
                
            })
    }

    useEffect(() => {
        fetchPost();
    },[]);

    useEffect(() => {
        const checkIfEnriched = async () => {
            if (currentUser) {
                
                if (currentUser?.enrichedPosts.includes(post?._id)) {
                    
                    
                     setEnrichedPost(true)
                } else {
                    
                    setEnrichedPost(false)
                }
            } else {
                
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
                         
                     <div className='clickable' onClick={() => navigate(`/users/${author?.username}/profile`)}>
                        {author?.username}
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
                    {post?.enrichment}
                </div>
                <div className='clickable hover-style-1 comment-interactable'><CommentIcon/></div>
                <div className='clickable hover-style-1 link-interactable'><LinkIcon/></div>
            </div>
            
        </div>
    );
}


export default PostPreview;