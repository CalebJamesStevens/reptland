import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ProfileIcon from "../icons/profile-icon";
import FriendRequestButton from "./friend-request-button";
import { useNavigate } from 'react-router-dom';
import PostPreview from "../posts/post-preview";

function DifferentUsersProfile ({user, posts}) {
    const navigate = useNavigate();

    const {currentUser, setCurrentUser} = useContext(UserContext);


    return (
        <>
        <div className='user-profile-sidebar-container container-1'>
                
        <div className='sidebar-profile-picture'><ProfileIcon/></div>
        <div>{user?.username}</div>
        <div>{user?.bio && user?.bio}</div>
        {}
        {(currentUser && user) && 
            
            <>
            <form action={currentUser?.followedUsers.includes(user?._id) ? `/api/users/${user?.username}/unfollow-user` : `/api/users/${user?.username}/follow-user`} method='POST'>
                <input type="hidden" name='userID' value={user?._id}/>
                <input
                className='button-style-2' 
                type='submit' 
                value={currentUser?.followedUsers.includes(user?._id) ? 'Unfollow' : 'Follow'}>
                </input>
            </form>
            <FriendRequestButton userID={user?._id}/>
            </>
            
        }
        </div>
            
         <div className='user-profile-post-container'>
            {posts.length > 0 ? posts?.map(post => {
                return(<PostPreview key={post} postID={post}/>)
            }) : <h2>No posts to be shown here...</h2>}
        </div>
        </>
    )
}

export default DifferentUsersProfile;