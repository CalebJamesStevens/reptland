import './home.css';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import HomePosts from '../posts/home-posts';
import CommunitiesSidebar from './communities-sidebar copy';
import CreateSidebar from './create-sidebar copy';
import UsersSidebar from './users-sidebar';

function Home() {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    let test = () => {
        console.log('fetching home')
        fetch('/home/')
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
            <div className='home-sidebar-right'>
                <CommunitiesSidebar/>
                <CreateSidebar/>
                <UsersSidebar/>
            </div>
        </div>
    );
}

export default Home;
