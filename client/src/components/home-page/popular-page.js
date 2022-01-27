import './home.css';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import HomePosts from '../posts/home-posts';
import CommunitiesSidebar from './communities-sidebar copy';
import CreateSidebar from './create-sidebar copy';
import UsersSidebar from './users-sidebar';
import useWindowDimensions from '../custom-hooks/useWindowDimensions';
import PopularPosts from '../posts/popular-posts';

function PopularPage() {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {height, width} = useWindowDimensions();


    useEffect(() => {
        
    }, []);

    return (
        <div className="home-container">
            <PopularPosts/>
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

export default PopularPage;
