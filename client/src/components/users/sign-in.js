import {useEffect, useState} from 'react';

function SignIn() {
    

    return (
        <div className="sign-in-container">
            <form action="/users/sign-in" method="POST">
                <div>
                    <label>Username:</label>
                    <input name="username" type="username" id="username"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input name="password" type="password" id="password"/>
                </div>
                <input type="submit" value="Sign In"/>
            </form>
        </div>
    );
}

export default SignIn;
