import './home.css';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';

function Home() {
    const user = useContext(UserContext);

    return (
        <div className="home-container">
            <div>{user && user.username}</div>
            <h2>Home</h2>
        </div>
    );
}

export default Home;
