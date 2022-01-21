import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function CommunityNavbarTopicsDropdown () {
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
            <div
                onClick={() => {logout()}} 
                className="dropdown-option-1 clickable hover-style-2"
            >
                Log Out
            </div>
        </div>
    )
}

export default CommunityNavbarTopicsDropdown;