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
    const [postHtml, setPostHtml] = useState();
    const [enrichedPost, setEnrichedPost] = useState();
    const [heartIconHtml, setHeartIconHtml] = useState();
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
                if(currentUser) {
                    fetch(`/users/getEnrichedPosts`)
                        .then(res => res.json())
                        .then(posts => {
                            setCurrentUser({...currentUser, enrichedPosts: posts})
                            console.log(currentUser)
                            setPost(data)
                        })
                } else {
                    setPost(data)
                }
            })

        console.log('fetching comments')
        await fetch(`/posts/${postID}/get-child-comments`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.forEach(comment => {
                    setComments(current => [...current, <CommentView key={comment} commentID={comment}/>])
                });
            })
    }

    useEffect(() => {
        if(post) return;
        fetchPost();
    },[]);
    const test = () => {
        console.log('test')
        setHeartIconHtml(<>TEST</>)
    }   
    useEffect(() => {
        if (!postHtml) return;
        const createHeart= async ()=> {
            console.log('Enrichment: ' + enrichedPost)
            if (enrichedPost) {
                console.log('Changing classes to' + enrichedPost)
                setHeartIconHtml(
                    <>
                        <div onClick={() => {likePost()}}
                        className={`filled clickable hover-style-1 heart-interactable`}>
                            <HeartIcon/>
                        </div>
                    </>
                ) 
            } else {
                console.log('Changing classes to' + enrichedPost)
                setHeartIconHtml(
                    <>
                        <div onClick={() => {likePost()}}
                        className={`clickable hover-style-1 heart-interactable`}>
                            <HeartIcon/>
                        </div>
                    </>
                )
            }
        }
        createHeart();
    },[enrichedPost]);

    useEffect(() => {
        if (!post) return;
        const createPost = async () => {
            console.log('creating post')
            await setPostHtml(
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
                        {heartIconHtml}
                        <div className='clickable hover-style-1 comment-interactable'><CommentIcon/></div>
                        <div className='clickable hover-style-1 link-interactable'><LinkIcon/></div>
                    </div>
    
                </>
            )
        }     
        createPost()
    },[post, heartIconHtml])

    useEffect(() => {
        if (!post) return;
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
        
    },[post])

    return (
        <div className='post-container'>
            {postHtml && postHtml}
            <div className='comments-container'>
                <form className='post-comment-form' action="/comments/new" method='POST'>
                    <input type='hidden' name='postID' value={postID}/>
                    <textarea className='post-comment-textarea' name='body' id='body' placeholder="Comment" type='text'/>
                    <div className='post-comment-submit'>
                        <input className='button-style-1' type='submit' value={'Comment'}/>
                    </div>
                </form>
                {comments}
            </div>
        </div>
    );
}

export default Post;