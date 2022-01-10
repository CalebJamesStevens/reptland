import './home.css';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import HomePosts from '../posts/home-posts';

function Home() {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    return (
        <div className="home-container">
            <div>{currentUser && currentUser.username}</div>
            <h2>Home</h2>
            <HomePosts/>
            
        </div>
    );
}

export default Home;
