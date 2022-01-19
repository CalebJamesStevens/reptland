import ProfileIcon from "../icons/profile-icon";
import { useNavigate } from 'react-router-dom';

function CurrentUsersProfile ({user, posts}) {
    const navigate = useNavigate();

    return (
        <>
        <div className='user-profile-sidebar-container container-3'>
                <div className='sidebar-profile-picture'><ProfileIcon/></div>
                <div>{user?.username}</div>
                <div>{user?.bio && user?.bio}</div>
                <div onClick={() => navigate(`/posts/new-post`)} className="clickable hover-style-1 button-style-1">Create Post</div>
        </div>
            
         <div className='user-profile-post-container'>
            {posts.length > 0 ? posts : <h2>No posts to be shown here...</h2>}
        </div>
        </>
    )
}

export default CurrentUsersProfile;