import {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import useWindowDimensions from '../custom-hooks/useWindowDimensions';
import AddIcon from '../icons/add-icon';
import DropdownIcon from '../icons/dropdown-icon';
import FollowedUsersIcon from '../icons/follower-users-icon';
import HomeIcon from '../icons/home-icon';
import PopularIcon from '../icons/popular-icon';
import ProfileIcon from '../icons/profile-icon';
import NavProfileDropdown from './nav-profile-dropdown';

function NavBar() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [currentHomeDisplay, setCurrentHomeDisplay] = useState()
    const [navProfileDropdownToggle, setNavProfileDropdownToggle] = useState(false);
    const {height, width} = useWindowDimensions();
    
    const navigate = useNavigate();

    useEffect(() => {

    }, [currentUser])
    
    return (
        <nav className='navbar'>
            {currentUser ? 
            (
                <>
                    <div className='header-website-name nav-item-container'>
                        {width > 850 ? "Reptland" : "R"}
                        
                    </div>
                    <div className="nav-categories nav-item-container">
                        <div onClick={() => navigate('/')} className="clickable center-nav-icon ">
                            <HomeIcon/>
                        </div>
                        <div onClick={() => navigate('/popular')} className="clickable center-nav-icon ">
                            <PopularIcon/>
                        </div>
                        <div onClick={() => navigate('/followed-users')} className="clickable center-nav-icon">
                            <FollowedUsersIcon/>
                        </div>
                        <div onClick={() => navigate('/posts/new-post')} className="clickable center-nav-icon">
                            <AddIcon/>
                        </div>
                    </div>

                    <div className="nav-profile nav-item-container">
                        {width > 850 && (
                            <div className='nav-profile-preview'>
                                <ProfileIcon/>
                                <div className='clickable'>
                                    {currentUser?.username}
                                </div>
                                <div onClick={() => {setNavProfileDropdownToggle(current => !current)}} className={`${navProfileDropdownToggle ? 'upside-down' : ''} nav-profile-dropdown-icon clickable`}>
                                    <DropdownIcon/>
                                </div>
                                {navProfileDropdownToggle && <NavProfileDropdown/>}
                            </div>
                        )}
                        {width < 850 && (
                            <div className="clickable nav-profile-preview">
                                <div onClick={() => {setNavProfileDropdownToggle(current => !current)}} className={`${navProfileDropdownToggle ? 'upside-down' : ''} nav-profile-dropdown-icon clickable`}>
                                    <DropdownIcon/>
                                </div>
                                {navProfileDropdownToggle && <NavProfileDropdown/>}
                            </div>
                        )}
                    </div>
                </>
            )
            
            : 

            (
                <>
                    <div className='header-website-name nav-item-container'>
                        {width > 850 ? "Reptland" : "R"}
                    </div>
                        <div className="nav-categories nav-item-container">
                            <div onClick={() => navigate('/')} className="clickable center-nav-icon ">
                        <HomeIcon/>
                        </div>
                        <div onClick={() => navigate('/popular')} className="clickable center-nav-icon ">
                            <PopularIcon/>
                        </div>
                        <div onClick={() => navigate('/followed-users')} className="clickable center-nav-icon">
                            <FollowedUsersIcon/>
                        </div>
                        <div onClick={() => navigate('/posts/new-post')} className="clickable center-nav-icon">
                            <AddIcon/>
                        </div>
                    </div>

                    {width > 850 && (
                        <div className="nav-user-logged-out nav-item-container">
                            <div onClick={() => navigate('/users/sign-in')} className="clickable sign-in-button">
                                Sign In
                            </div>
                            <div onClick={() => navigate('/users/sign-up')} className="clickable sign-up-button">
                                Sign Up                    
                            </div>
                        </div>
                    )}
                    {width < 850 && (
                        <div className="clickable nav-user-logged-out nav-item-container">
                                <div onClick={() => {setNavProfileDropdownToggle(current => !current)}} className={`${navProfileDropdownToggle ? 'upside-down' : ''} nav-profile-dropdown-icon clickable`}>
                                    <DropdownIcon/>
                                </div>
                                {navProfileDropdownToggle && <NavProfileDropdown/>}
                        </div>
                    )}
                </>
            )
            }
        </nav>
    );
}

export default NavBar;
