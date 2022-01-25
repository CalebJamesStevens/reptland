import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../icons/profile-icon';
function SignUp () {
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();

    const checkErrors = async () => {
        await setErrors(new Array())
        fetch('/api/users/sign-up')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.errors) {
                setErrors(data.errors)
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
        <div className="sign-up-container">
            <form className='form-style-1' action="/api/users/sign-up" method="POST">
                {errors?.length > 0 && errors?.map(error =>
                    {return (<div className='sign-up-error'>{error}</div>)}
                )}
                
                <div className='header-1'>Sign Up</div>

                <div className='sign-in-profile-icon'>
                    <ProfileIcon/>
                </div>
                
                <input
                    type="email"
                    id="email"
                    name="email"
                    class="input-field-style-1"
                    placeholder="Enter email"
                />

                <input className='input-field-style-1' name="username" placeholder='username' type="username" id="username"/>
        
                <input className='input-field-style-1' name="password" placeholder='password (at least 6 characters)' type="password" id="password"/>
                
                <input className='input-field-style-1' name="confirm_password" placeholder='confirm password' type="password" id="confirm_password"/>
                
                <input className='clickable button-style-2 sign-in-button-1' type="submit" value="Sign Up"/>
            </form>
        </div>
    );
}

export default SignUp;