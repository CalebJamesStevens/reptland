import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import HeartIcon from '../icons/heart-icon'
import CommentIcon from '../icons/comment-icon'
import LinkIcon from '../icons/link-icon'
import ProfileIcon from '../icons/profile-icon';
import { useNavigate } from 'react-router-dom';
import CommentView from '../comments/comment-view';

function Post({postID}) {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [post, setPost] = useState();
    const [enrichedPost, setEnrichedPost] = useState();
    const [comments, setComments] = useState();
    const [author, setAuthor] = useState();
    const [community, setCommunity] = useState();
    const navigate = useNavigate();


    const deleteButton = (
        <form className="delete-comment-form" action={`/api/posts/${postID}?_method=DELETE`} method='POST'>
            <input type='hidden' name='postID' value={postID}/>
            <div className="comment-reply-submit">
                <input className='button-style-1' type='submit' value={'Delete'}/>
            </div>
        </form>
    )

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
                
                if(currentUser) {
                    fetch(`/api/users/getEnrichedPosts`)
                        .then(res => res.json())
                        .then(posts => {
                            setCurrentUser({...currentUser, enrichedPosts: posts})
                            setPost(data)
                        })
                } else {
                    setPost(data)
                }
            })

        await fetch(`/api/posts/${postID}/get-child-comments`)
            .then(res => res.json())
            .then(setComments(new Array()))
            .then(data => {
                console.log(data)
                data.forEach(comment => {
                    setComments(current => [...current, comment])
                });
            })
    }

    useEffect(() => {
        fetchPost();
    },[]);

    useEffect(() => {
        const checkIfEnriched = async () => {
            if (currentUser) {
                if (currentUser?.enrichedPosts.includes(post?._id)) {
                    console.log(currentUser)
                     setEnrichedPost(true)
                } else {
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
        <div className='post-container'>
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
            {post?.images?.length > 0 && (
                <div className='post-images-container'>
                    {post?.images?.map(key => {
                        console.log(key)
                        return(<img src={`/api/posts/images/${key}`}/>)
                    })}
                </div>
            )}
            <div className='post-body'>{post?.body}</div>
            <div className='post-interaction-icon-container'>
                <div onClick={() => {likePost()}}
                className={`${enrichedPost && 'filled'} clickable hover-style-1 heart-interactable`}>
                    <HeartIcon/>
                </div>
                <div className='clickable hover-style-1 comment-interactable'><CommentIcon/></div>
                <div className='clickable hover-style-1 link-interactable'><LinkIcon/></div>
            </div>
            <div>{currentUser?._id == post?.authorID && deleteButton}</div>
            <div className='comments-container'>
                <form className='post-comment-form' action="/api/comments/new" method='POST'>
                    <input type='hidden' name='postID' value={postID}/>
                    <textarea className='post-comment-textarea' name='body' id='body' placeholder="Comment" type='text'/>
                    <div className='post-comment-submit'>
                        <input className='button-style-1' type='submit' value={'Comment'}/>
                    </div>
                </form>
                {comments && comments.map(comment => {
                    console.log(comment)
                    return (<CommentView key={comment} commentID={comment}/>)
                })}
            </div>
        </div>
    );
}

export default Post;