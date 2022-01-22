import './home.css';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import HomePosts from '../posts/home-posts';
import CommunitiesSidebar from './communities-sidebar copy';
import CreateSidebar from './create-sidebar copy';
import UsersSidebar from './users-sidebar';
import useWindowDimensions from '../custom-hooks/useWindowDimensions';

function Home() {
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
            <HomePosts/>
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

export default Home;
