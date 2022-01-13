import {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import ProfileIcon from '../icons/profile-icon';
import Post from '../posts/post';

function UserProfile() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {username} = useParams();
    const [user, setUser] = useState(null);
    const [userHtml, setUserHtml] = useState();
    const [userPosts, setUserPosts] = useState(new Array())

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

    const friendUserHtml = (
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

    const currentUserHtml = (
        <>
            <div className='user-profile-sidebar-container container-1'>
                <div className='sidebar-profile-picture'><ProfileIcon></ProfileIcon></div>
                <div>{user?.username}</div>
                <div>{user?.bio && user?.bio}</div>
                <div onClick={() => navigate(`/posts/new-post`)} className="clickable hover-style-1 button-style-1">Create Post</div>
            </div>
                
             <div className='user-profile-post-container'>
                {userPosts.length > 0 ? userPosts : <h2>No posts to be shown here...</h2>}
            </div>

        </>
    )

    const notCurrentUserHtml = (
        <>
            <div className='user-profile-sidebar-container container-1'>
                
                <div className='sidebar-profile-picture'><ProfileIcon></ProfileIcon></div>
                <div>{user?.username}</div>
                <div>{user?.bio && user?.bio}</div>
                {console.log(currentUser)}
                {currentUser && followUserHtml}
            </div>
                
             <div className='user-profile-post-container'>
                {userPosts.length > 0 ? userPosts : <h2>No posts to be shown here...</h2>}
            </div>
        </>
    )

    const findUser = () => {
        fetch(`/users/${username}/profile`)
            .then(res => res.json())
            .then (data => {
                setUser(data);
            })
    }

    const fetchPosts = async () => {
        await user.posts.forEach(post => {
            console.log(post)
            setUserPosts(current => [...current, <Post key={post} postID={post}/>])
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
            setUserHtml(currentUserHtml)
        } else {
            setUserHtml(notCurrentUserHtml)
        }
    }, [userPosts, currentUser])

    useEffect(() => {
        setUser(null)
        findUser()
    },[]);

    return (
        <div className='user-profile-container'>
            {user && userHtml}
        </div>
    );
}

export default UserProfile;