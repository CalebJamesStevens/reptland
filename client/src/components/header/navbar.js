import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import AddIcon from '../icons/add-icon';
import CommunityIcon from '../icons/community-icon';
import FollowedUsersIcon from '../icons/follower-users-icon';
import HomeIcon from '../icons/home-icon';
import ProfileIcon from '../icons/profile-icon';

function NavBar() {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    return (
        <nav className='navbar'>
            <div id="header-website-name nav-item-container">Reptland</div>
            <div className="nav-categories nav-item-container">
                <div className="clickable center-nav-icon ">
                    <HomeIcon/>
                </div>
                <div className="clickable center-nav-icon">
                    <CommunityIcon/>
                </div>
                <div className="clickable center-nav-icon">
                    <FollowedUsersIcon/>
                </div>
                <div className="clickable center-nav-icon">
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
