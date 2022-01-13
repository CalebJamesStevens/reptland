import {useContext, useEffect, useState} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import AddIcon from '../icons/add-icon';
import DropdownIcon from '../icons/dropdown-icon';
import FollowedUsersIcon from '../icons/follower-users-icon';
import HomeIcon from '../icons/home-icon';
import ProfileIcon from '../icons/profile-icon';
import NavProfileDropdown from './nav-profile-dropdown';

function NavBar() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [currentHomeDisplay, setCurrentHomeDisplay] = useState()
    const [navProfileDropdownToggle, setNavProfileDropdownToggle] = useState(false);
    
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
                    Sign Up                    
                </div>
            </div>
        </>
    )

    const loggedInNavHtml = (
        <>
            <div className='header-website-name nav-item-container'>
                Reptland
            </div>
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
            </div>
        </>
    )

    useEffect(() => {

    }, [currentUser])
    
    return (
        <nav className='navbar'>
            {currentUser ? loggedInNavHtml : loggedOutNavHtml}
        </nav>
    );
}

export default NavBar;
