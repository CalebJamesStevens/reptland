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

    return (
        <nav className='navbar'>
            <div id="header-website-name nav-item-container">Reptland</div>
            <div className="nav-categories nav-item-container">
                <div onClick={() => redirect('/')} className="clickable center-nav-icon ">
                    <HomeIcon/>
                </div>
                <div onClick={() => redirect('/')} className="clickable center-nav-icon">
                    <FollowedUsersIcon/>
                </div>
                <div onClick={() => redirect('/posts/new-post')} className="clickable center-nav-icon">
                    <AddIcon/>
                </div>
                
            </div>

            <div className="nav-profile nav-item-container">
                <ProfileIcon/>
            </div>
        </nav>
    );
}

export default NavBar;
