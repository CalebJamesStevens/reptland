import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function NavProfileDropdown () {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const navigate = useNavigate() 

    const logout = () => {
        fetch('/api/users/logout')
            .then(res => res.json())
            .then(data => {
                fetch('/api/users/currentUser')
                .then(res => res.json())
                .then(data => {
                  setCurrentUser(data);
                })
                .then(navigate('/home'))
            })
        
    }

    return (
        <div className="nav-profile-dropdown dropdown-style-1">
            {currentUser && (
                <>
                    <div
                        onClick={() => {logout()}} 
                        className="dropdown-option-1 clickable hover-style-2"
                    >
                        Log Out
                    </div>
                    <div
                        onClick={() => {navigate('/communities/new-community')}} 
                        className="dropdown-option-1 clickable hover-style-2"
                    >
                        Create Community
                    </div>
                    <div
                        onClick={() => {navigate('/posts/new-post')}} 
                        className="dropdown-option-1 clickable hover-style-2"
                    >
                        Create Post
                    </div>
                </>
            )}
            {!currentUser && (
                <>
                    <div
                        onClick={() => {navigate('/users/sign-in')}} 
                        className="dropdown-option-1 clickable hover-style-2"
                    >
                        Sign In
                    </div>
                    <div
                        onClick={() => {navigate('/users/sign-up')}} 
                        className="dropdown-option-1 clickable hover-style-2"
                    >
                        Sign Up
                    </div>
                </>
            )}
        </div>
    )
}

export default NavProfileDropdown;