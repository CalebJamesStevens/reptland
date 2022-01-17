import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function CommentView ({commentID}) {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [comment, setComment] = useState()
    const [replies, setReplies] = useState(new Array())
    const [author, setAuthor] = useState()
    const [repliedTo, setRepliedTo] = useState()

    const navigate = useNavigate();

    const fetchComment = () => {
        fetch(`/comments/get/${commentID}`)
            .then(res => res.json())
            .then(data => {
                fetch(`/users/${data.author}/info`)
                    .then(res => res.json())
                    .then(auth => {
                        setAuthor(auth)
                    })
                if(data.parentComment != null) {
                    fetch(`/comments/get/${data.parentComment}`)
                        .then(res => res.json())
                        .then(pData => {
                            fetch(`/users/${pData.author}/info`)
                                .then(res => res.json())
                                .then(auth => {
                                    setRepliedTo(auth)
                                })
                        })
                }
                setComment(data)
            })
    }

    const deleteButton = (
        <form className="delete-comment-form" action={`/comments/${comment?._id}?_method=DELETE`} method='POST'>
                        <input type='hidden' name='commentID' value={comment?._id}/>
                        <input type='hidden' name='postID' value={comment?.post}/>
                        <div className="comment-reply-submit">
                            <input onClick={() => {navigate(`/posts/view-post/${comment?.post}`)}} className='button-style-1' type='submit' value={'Delete'}/>
                        </div>
        </form>
    )

    const fetchReplies = () => {
        fetch(`/comments/get/${commentID}/replies`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.forEach(c => {
                    setReplies(current => [...current, <CommentView key={c} commentID={c}/>])
                });
            })
    }

    useEffect(() => {
        if(comment) return;
        fetchReplies();
        fetchComment();
    },[])

    useEffect(() => {
        if (!comment) return;


    }, [comment])

    return (
        <div className="comment-container">
            <div className="comment-author">{author && author.username}</div>
            <div>{repliedTo && `Reply to: ${repliedTo.username}`}</div>
            <div className="container-3 comment-body-container">
                <div className="comment-body-text">{comment && comment.body}</div>
                {currentUser?._id == author?._id && deleteButton}
                <form className="comment-reply-form" action="/comments/new" method='POST'>
                        <input type='hidden' name='parentComment' value={comment?._id}/>
                        <input type='hidden' name='postID' value={comment?.post}/>
                        <textarea className="comment-reply-textarea" name='body' placeholder='Reply!' id='body' type='text'/>
                        <div className="comment-reply-submit">
                            <input className='button-style-1' type='submit' value={'Reply'}/>
                        </div>
                </form>
                
            </div>
            {replies}
            

        </div>
    )
} 

export default CommentView;