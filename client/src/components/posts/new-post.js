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
    


    const communitySelectChange = (event) => {
        console.log(event.target.value)
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
                console.log(data.topics)
            })
    }

    const changeCommunityTopics = () => {
        setHtmlCommunityTopics(new Array())
        communityTopics.forEach(topic => {
            setHtmlCommunityTopics(current => [...current, <option name="communityTopic" value={topic}>{topic}</option>])
        })

        setCommunityTopicSelector(
            <>
                <label htmlFor="communityTopic">Topic:</label>
                <select name="communityTopic" id="post-form-community-topic-select">
                    <option name="communityTopic" value="general">General</option>
                    {htmlCommunityTopics && htmlCommunityTopics}
                </select>
            </>
        )
    }

    const getCommunityNames = () => {
        console.log('geting communities')
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

    useEffect(() => {
        changeCommunityTopics();
        
    },[communityTopics])


    return (
        <div className='new-post-container'>
            <div className='new-post-header'>Create a post:</div>
            <form className='form-style-2' action="/posts/new-post" method="POST">
                <div className='new-post-slectors'>
                    <label htmlFor="community">Post to:</label>
                    <select className='select-1' onChange={communitySelectChange} name="community" id="post-form-community-select">
                        <option name="community" value=" ">My Profile</option>
                        {userCommunityNameOptions && userCommunityNameOptions}
                    </select>

                    <label htmlFor="communityTopic">Topic:</label>
                    <select className='select-1' name="communityTopic" id="post-form-community-topic-select">
                        {htmlCommunityTopics && htmlCommunityTopics}
                    </select>
                </div>
                
                <input className='new-post-title input-field-style-1' maxLength='300' placeholder="Title" name="title" type="text" id="title"/>
                <textarea className='new-post-body input-field-style-1' placeholder="Body" name="body" type="text" id="body"/>
                <input className='new-post-title input-field-style-1' maxLength='300' placeholder="Tags: Please seperate by commas" name="tags" type="text" id="tags"/>
                
                <input className='new-post-submit button-style-2' type="submit" value="Post"/>
            </form>
        </div>
    );
}

export default NewPost;