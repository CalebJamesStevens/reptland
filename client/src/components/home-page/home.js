import './home.css';
import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import HomePosts from '../posts/home-posts';

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
        </div>
    );
}

export default Home;
