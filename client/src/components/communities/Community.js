import {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import PostPreview from '../posts/post-preview';

function Community() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [community, setCommunity] = useState(null);
    const {communityName} = useParams();
    const [topic, setTopic] = useState('General')
    const [posts, setPosts] = useState();
    const [communtiyNavbar, setCommunityNavbar] = useState();
    const [toggleTopicDD, setToggleTopicDD] = useState(false);
    const [joinButton, setJoinButton] = useState()

    const navigate = useNavigate();

    const fetchAllCommunityPosts = async () => {
        
        await setPosts(new Array())
        await community?.posts.forEach (post => {
            
            setPosts(current => [...current, <PostPreview key={post} postID={post}/>])
        })
        
    }

    const fetchCommunityPostsByTopic = async () => {
        
        
        await setPosts(new Array())
        fetch(`/api/communities/${community?.name}/${topic}/posts`)
            .then(res => res.json())
            .then(data => {
                data.forEach (post => {
                    setPosts(current => [...current, <PostPreview key={post} postID={post}/>])
                })
            })
    }

    const fetchCommunity = async () => {
        fetch(`/api/communities/view/${communityName}`)
            .then(res => res.json())
            .then(data => {
                
                setCommunity(data)
            })
        
    }

    const buildJoinButton = () => {
        
        
        if (currentUser) {
            if (currentUser?.communities.includes(community?._id)) {
                setJoinButton (
                    <form action={`/api/communities/${community?.name}/leave-community`} method="POST">
                        <input className='clickable button-style-1' type="submit" value="Leave"/>
                        <input type="hidden" name="communityID" value={community?._id}/>
                    </form>
                )
            } else {
                setJoinButton (
                    <form action={`/api/communities/${community?.name}/join-community`} method="POST">
                        <input className='clickable button-style-1' type="submit" value="Join"/>
                        <input type="hidden" name="communityID" value={community?._id}/>
                    </form>
                )
            }
            
        } else {
            setJoinButton (
                <form>
                    <input onClick={() => {navigate('/users/sign-in')}} className='clickable button-style-1' value="Join"/>
                </form>
            )
        }
    }

    const buildCommuntiyNavbar = async () => {
        let topicChoices = await community?.topics.map(t => {
            ;
            return (
                <div 
                onClick={() => {setTopic(t)}}
                className='dropdown-option-1 hover-style-2'>
                    {t}
                </div>
                )
        })
        
        setCommunityNavbar(
            <>
                <div className='container-3 community-navbar'>
                    <div>
                        {communityName}
                    </div>
                    <div onClick={() => {setToggleTopicDD(current => !current)}}className='clickable community-topic-selector container-3 hover-style-1'>
                        {topic}
                        {toggleTopicDD && (
                            
                            <div className='dropdown-style-2 community-topic-dropdown'>
                                {topicChoices}
                            </div>
                            
                        )}
                    </div>
                    <div className='community-join-button'>
                        {joinButton}
                    </div>

                </div>
            </>
        )
    }

    useEffect(() => {
        if (community) return;
        fetchCommunity();

    },[currentUser]);

    useEffect(() => {
        if (!community) return;
        if (topic && topic != 'General') {
            fetchCommunityPostsByTopic();
        } else {
            fetchAllCommunityPosts();
        }
        buildJoinButton();
        buildCommuntiyNavbar()
    },[community, topic, currentUser])

    useEffect(() => {
        if (!community) return
        buildCommuntiyNavbar()
    }, [toggleTopicDD, joinButton, currentUser])

    return (
        <div className='community-container'>
            <div className='community-posts-container'>
                <div className='community-navbar-container'>
                    {communtiyNavbar}
                </div>
                <div className='community-posts'>
                    {posts && posts}
                </div>
            </div>
        </div>
    );
}

export default Community;