import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import useWindowDimensions from '../custom-hooks/useWindowDimensions';
import FollowedUsersPost from '../posts/followed-users-posts';
import HomePosts from '../posts/home-posts';
import CommunitiesSidebar from './communities-sidebar copy';
import CreateSidebar from './create-sidebar copy';
import UsersSidebar from './users-sidebar';

function FollowedUsers() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {height, width} = useWindowDimensions();
    const navigate = useNavigate();


    useEffect(() => {
    }, []);

    return (
        <div className="home-container">
            <FollowedUsersPost/>
            
            {width > 950 && (
                <div className='home-sidebar-right'>
                    <CommunitiesSidebar/>
                    <CreateSidebar/>
                    <UsersSidebar/>
                </div>
            )}
        </div>
    );
}

export default FollowedUsers;