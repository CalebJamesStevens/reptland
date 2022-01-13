import ProfileIcon from '../icons/profile-icon';
function SignUp () {
    return (
        <div className="sign-up-container">
            <form className='form-style-1' action="/users/sign-up" method="POST">
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
        
                <input className='input-field-style-1' name="password" placeholder='password' type="password" id="password"/>
                
                <input className='input-field-style-1' name="confirm_password" placeholder='confirm password' type="password" id="confirm_password"/>
                
                <input className='clickable button-style-2 sign-in-button-1' type="submit" value="Sign Up"/>
            </form>
        </div>
    );
}

export default SignUp;