import {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import ProfileIcon from '../icons/profile-icon';
import Post from '../posts/post';
import PostPreview from '../posts/post-preview';
import CurrentUsersProfile from './current-users-profile';
import DifferentUsersProfile from './different-users-profile';
import FriendRequestButton from './friend-request-button';

function UserProfile() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const [userHtml, setUserHtml] = useState();
    const [userPosts, setUserPosts] = useState(new Array())
    const [ownProfile, setOwnProfile] = useState()
    const navigate = useNavigate()

    const followUserHtml = (
        <>
            <form action={currentUser?.followedUsers.includes(user?._id) ? `/users/${user?.username}/unfollow-user` : `/users/${user?.username}/follow-user`} method='POST'>
                <input type="hidden" name='userID' value={user?._id}/>
                <input
                    className='button-style-2' 
                    type='submit' 
                    value={currentUser?.followedUsers.includes(user?._id) ? 'Unfollow' : 'Follow'}>
                </input>
            </form>
        </>
    )

    const findUser = () => {
        fetch(`/api/users/${username}/profile`)
            .then(res => res.json())
            .then (data => {
                setUser(data);
            })
    }

    const fetchPosts = async () => {
        await user.posts.forEach(post => {
            console.log(post)
            setUserPosts(current => [...current, <PostPreview key={post} postID={post}/>])
        })        
    }

    useEffect(() => {
        console.log('USER CHANGED')
        setUserPosts(current => current = new Array())
        if (user) {
            console.log('made it this dar')
            fetchPosts();
        }

    },[user]);

    useEffect(() => {
        if (currentUser && username == currentUser?.username) {
            setOwnProfile(true)
        } else {
            setOwnProfile(false)
        }
    }, [userPosts, currentUser])

    useEffect(() => {
        setUser(null)
        findUser()
    },[]);

    return (
        <div className='user-profile-container'>
            {(user && ownProfile) ? <CurrentUsersProfile posts={userPosts} user={user}/> : <DifferentUsersProfile posts={userPosts} user={user}/>}
            
        </div>
    );
}

export default UserProfile;