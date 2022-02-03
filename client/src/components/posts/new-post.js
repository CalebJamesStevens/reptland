import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import Post from './post';

function NewPost() {
    const navigate = useNavigate();

    const {currentUser, setCurrentUser} = useContext(UserContext);
    
    const [userCommunityNameOptions, setUserCommunityNameOptions] = useState(new Array());
    const [communityTopics, setCommunityTopics] = useState(new Array());
    const [htmlCommunityTopics, setHtmlCommunityTopics] = useState();
    const [communityTopicSelector, setCommunityTopicSelector] = useState();
    const [errors, setErrors] = useState(new Array());


    const communitySelectChange = (event) => {
        
        if (event.target.value == " ") {
            setHtmlCommunityTopics(new Array());
            setCommunityTopics(new Array());
            setCommunityTopicSelector(null);
            return;
        }
        fetch(`/api/communities/view/${event.target.value}`)
            .then(res => res.json())
            .then(data => {
                setCommunityTopics(data.topics)
                
            })
    }


    const getCommunityNames = () => {
        
        currentUser?.communities.forEach(community => {
            fetch(`/api/communities/view/${community}`)
            .then(res => res.json())
            .then(data => {
                setUserCommunityNameOptions(current => [...current, <option name="community" value={community}>{data.name}</option>])
            })
        })

    }



    useEffect(() => {
        if (!currentUser) {
            navigate('/users/sign-in')
            return;
        };
        getCommunityNames();
    },[currentUser])

    const apiPost = (data) => {
        
        const body = new FormData(data);
        fetch('/api/posts/new-post', { method: 'POST', body })
            .then(res => res.json())
            .then(data => {
                
                if (data.id) {
                    navigate(`/posts/view-post/${data.id}`)
                }

                if (data.rateError) {
                    setErrors(current => [...current, data.rateError])
                }
            })
    }

    return (
        <div className='new-post-container'>
            <div className='new-post-header'>Create a post:</div>
            {errors?.length > 0 && (
                <>
                    <div className='new-post-erros'>
                        {errors.map(error => {
                            return (
                                <div onClick={() => {setErrors(errors?.filter(e => 
                                    e != error
                                ))}} className='clickable flash-error-card'>{error}</div>
                            )
                        })}
                    </div>
                </>
            )}
            <form className='new-post-form-container form-style-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    apiPost(e.target);
                }}
            >
                <div className='new-post-slectors'>
                    <label htmlFor="community">Post to:</label>
                    <select className='select-1' onChange={communitySelectChange} name="community" id="post-form-community-select">
                        <option name="community" value=" ">My Profile</option>
                        {userCommunityNameOptions && userCommunityNameOptions}
                    </select>

                    {communityTopics?.length > 0 && (
                        <>
                        <label htmlFor="communityTopic">Topic:</label>
                        <select className='select-1' name="communityTopic" id="post-form-community-topic-select">
                            {communityTopics?.map(topic => {
                                    return(<option key={topic} name="communityTopic" value={topic}>{topic}</option>)
                                })}
                        </select>
                        </>
                        )}
                </div>
                
                <input className='new-post-title input-field-style-1' maxLength='300' placeholder="Title" name="title" type="text" id="title"/>
                <input type='file' name='images' accept=".png, .jpeg, .jpg"/>
                <textarea className='new-post-body input-field-style-1' placeholder="Body" name="body" type="text" id="body"/>
                
                <input className='new-post-title input-field-style-1' maxLength='300' placeholder="Tags: Please seperate by commas" name="tags" type="text" id="tags"/>
                
                <input className='new-post-submit button-style-2' type="submit" value="Post"/>
            </form>
        </div>
    );
}

export default NewPost;