import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../icons/profile-icon';

function SignIn() {
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()
    const checkErrors = async () => {
        await setErrors(new Array())
        fetch('/api/users/sign-in')
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setErrors(data.error)
            }
        }) 
    }
    const checkCurrentUser = async () => {
        await fetch('/api/users/currentUser')
        .then(res => res.json())
        .then(data => {
            if (data) {
                navigate('/')
            }
        })
    }
    useEffect(() => {
        checkCurrentUser()
        checkErrors();
    }, [])

    return (
        <div className="sign-in-container">
            
            <form className='form-style-1' action="/api/users/sign-in" method="POST">
                <div className='header-1'>Sign In</div>

                <div className='sign-in-profile-icon'>
                    <ProfileIcon/>
                </div>
                
                {errors?.length > 0 && (
                    <div className='sign-in-error'>{errors}</div>
                )}
                <input className='input-field-style-1' name="username" placeholder='username' type="username" id="username"/>
        
                <input className='input-field-style-1' name="password" placeholder='password' type="password" id="password"/>
                
                <input className='clickable button-style-2 sign-in-button-1' type="submit" value="Sign In"/>
            </form>
        </div>
    );
}

export default SignIn;
