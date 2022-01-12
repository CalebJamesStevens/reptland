import {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import AddIcon from '../icons/add-icon';
import CommunityIcon from '../icons/community-icon';
import FollowedUsersIcon from '../icons/follower-users-icon';
import HomeIcon from '../icons/home-icon';
import ProfileIcon from '../icons/profile-icon';

function NavBar() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [currentHomeDisplay, setCurrentHomeDisplay] = useState()
    const navigate = useNavigate();

    const redirect = (path) => {
        navigate(path);
    }

    const loggedOutNavHtml = (
        <>
            <div className='header-website-name nav-item-container'>Reptland</div>
                <div className="nav-categories nav-item-container">
                    <div onClick={() => redirect('/home')} className="clickable center-nav-icon ">
                <HomeIcon/>
                </div>
                <div onClick={() => redirect('/home/followed-users')} className="clickable center-nav-icon">
                    <FollowedUsersIcon/>
                </div>
                <div onClick={() => redirect('/posts/new-post')} className="clickable center-nav-icon">
                    <AddIcon/>
                </div>
            </div>

            <div className="nav-user-logged-out nav-item-container">
                <div onClick={() => redirect('/users/sign-in')} className="clickable sign-in-button">
                    Sign In
                </div>
                <div onClick={() => redirect('/users/sign-up')} className="clickable sign-up-button">
                    Sign Out                    
                </div>
            </div>
        </>
    )

    const loggedInNavHtml = (
        <>
            <div className='header-website-name nav-item-container'>Reptland</div>
                <div className="nav-categories nav-item-container">
                    <div onClick={() => redirect('/home')} className="clickable center-nav-icon ">
                <HomeIcon/>
                </div>
                <div onClick={() => redirect('/home/followed-users')} className="clickable center-nav-icon">
                    <FollowedUsersIcon/>
                </div>
                <div onClick={() => redirect('/posts/new-post')} className="clickable center-nav-icon">
                    <AddIcon/>
                </div>
            </div>

            <div className="nav-profile nav-item-container">
                <ProfileIcon/>
                <div>
                    {currentUser.username}
                </div>
            </div>
        </>
    )
    
    return (
        <nav className='navbar'>
            {currentUser ? loggedInNavHtml : loggedOutNavHtml}
        </nav>
    );
}

export default NavBar;
