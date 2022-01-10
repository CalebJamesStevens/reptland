import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Navigate, Route } from 'react-router-dom';
import Post from './post';

function NewPost() {
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
        fetch(`/communities/view/${event.target.value}`)
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
        currentUser.communities.forEach(community => {
            fetch(`/communities/view/${community}`)
            .then(res => res.json())
            .then(data => {
                setUserCommunityNameOptions(current => [...current, <option name="community" value={community}>{data.name}</option>])
            })
        })

    }

    useEffect(() => {
        if (!currentUser) return;
        getCommunityNames();
    },[currentUser])

    useEffect(() => {
        changeCommunityTopics();
        
    },[communityTopics])


    return (
        <div>
            {/*!currentUser && <Navigate to="/users/sign-in"/>*/}   
            <h1>New Post</h1>

            <form action="/posts/new-post" method="POST">
                <div>
                    <label htmlFor="community">Post to:</label>
                    <select onChange={communitySelectChange} name="community" id="post-form-community-select">
                        <option name="community" value=" ">My Profile</option>
                        {userCommunityNameOptions && userCommunityNameOptions}
                    </select>

                    <label htmlFor="communityTopic">Topic:</label>
                    <select name="communityTopic" id="post-form-community-topic-select">
                        {htmlCommunityTopics && htmlCommunityTopics}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="title"></label>
                    <input name="title" type="text" id="title"/>
                </div>
                <div>
                    <label htmlFor="body"></label>
                    <input name="body" type="text" id="body"/>
                </div>
                <input type="submit" value="Create"/>
            </form>
        </div>
    );
}

export default NewPost;