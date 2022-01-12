import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import HeartIcon from '../icons/heart-icon'
import CommentIcon from '../icons/comment-icon'
import LinkIcon from '../icons/link-icon'
import ProfileIcon from '../icons/profile-icon';
import { useNavigate } from 'react-router-dom';

function Post({postID}) {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [post, setPost] = useState(null);
    const [postHtml, setPostHtml] = useState();
    const navigate = useNavigate();

    const fetchPost = async () => {
        fetch(`/posts/view-post/${postID}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data)
            })
        
    }

    const createPost = () => {
        setPostHtml(
            <>

                <div className='post-user-info'>
                    <ProfileIcon/>
                    <div>
                        
                        <div className='clickable' onClick={() => navigate(`/users/${post?.authorID.username}/profile`)}>
                            {post?.authorID.username}
                        </div>
                        <div className='clickable' onClick={() => navigate(`/communities/view/${post?.community.name}`)}>
                            {post?.community.name}
                        </div>
                        
                    </div>
                </div>
                <div className='post-title'>{post?.title}</div>
                <div className='post-body'>{post?.body}</div>
                <div className='post-interaction-icon-container'>
                    <div className='clickable hover-style-1'><HeartIcon/></div>
                    <div className='clickable hover-style-1'><CommentIcon/></div>
                    <div className='clickable hover-style-1'><LinkIcon/></div>
                </div>

            </>
        )
    }


    useEffect(() => {
        console.log('fetching post')
        fetchPost();

    },[]);

    useEffect(() => {
        createPost()

    },[post]);

    return (
        <div className='post-container'>
            {postHtml && postHtml}
            
        </div>
    );
}

export default Post;