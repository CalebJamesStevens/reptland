import {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import Post from './post';

function NewPost() {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    return (
        <div>   
            <h1>New Post</h1>

            <form action="/posts/new-post" method="POST">
                <div>
                    <label for="community">Post to:</label>
                    <select name="community" id="post-form-community-select">
                        <option name="community" value="">My Profile</option>
                        

                    </select>
                    
                </div>
                
                <div>
                    <label for="title"></label>
                    <input name="title" type="text" id="title"/>
                </div>
                <div>
                    <label for="body"></label>
                    <input name="body" type="text" id="body"/>
                </div>
                <input type="submit" value="Create"/>
            </form>
        </div>
    );
}

export default NewPost;