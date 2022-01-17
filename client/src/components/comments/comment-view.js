import { useEffect, useState } from "react";

function CommentView ({commentID}) {
    const [comment, setComment] = useState()
    const [replies, setReplies] = useState(new Array())
    const [author, setAuthor] = useState()
    const [repliedTo, setRepliedTo] = useState()

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