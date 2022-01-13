import {useEffect, useState} from 'react';
import ProfileIcon from '../icons/profile-icon';

function SignIn() {
    

    return (
        <div className="sign-in-container">
            <form className='form-style-1' action="/users/sign-in" method="POST">
                <div className='header-1'>Sign In</div>

                <div className='sign-in-profile-icon'>
                    <ProfileIcon/>
                </div>
                
                <input className='input-field-style-1' name="username" placeholder='username' type="username" id="username"/>
        
                <input className='input-field-style-1' name="password" placeholder='password' type="password" id="password"/>
                
                <input className='clickable button-style-2 sign-in-button-1' type="submit" value="Sign In"/>
            </form>
        </div>
    );
}

export default SignIn;
