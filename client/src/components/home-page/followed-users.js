import {useContext, useEffect, useState} from 'react';
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

    let test = () => {
        console.log('fetching home')
        fetch('/api/home/')
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    useEffect(() => {
        test()
        console.log('asdfasdfa')
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